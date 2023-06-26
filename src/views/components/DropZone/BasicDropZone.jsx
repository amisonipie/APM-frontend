import { FiX } from "react-icons/fi";
import Dropzone from "react-dropzone";
import { UFIcon } from "utility/helper/UFIcon";
import { addIcon, rotateIcon } from "assets/icons/svgIcons";
import { fiveRandomNumbers, TR } from "utility/transformers";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import UploadProgressBar from "./UploadProgress";
import { handleFileUploader, uploadFileS3 } from "./handleFileUpload";

export const BasicDropzone = observer(
  forwardRef((props, ref) => {
    const [images, setImages] = useState([]);
    const [imageReload, setImageReload] = useState(false);
    const [updatedOnce, setUpdatedOnce] = useState(false);
    const [uploadProgress, setUploadProgress] = useState([
      { progress: 0, id: 0 },
    ]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setImages([]);
        setUploadProgress([{ progress: 0, id: 0 }]);
      },
    }));

    const handleDelete = (id) => {
      const filteredPropFiles = props.value.filter((file) => file.id !== id);
      const filteredLocalFiles = images.filter((file) => file.id !== id);
      setImages(filteredLocalFiles);
      props.handleChange(filteredPropFiles, "isDelete");
    };

    const handleRetry = (file) => {
      setImageReload(true);
      if (props.privateUpload) {
        handleFileUploader({
          ...props,
          file,
          progressCB: (e) => {
            setUploadProgress([
              ...uploadProgress,
              { progress: e, id: file.id },
            ]);
          },
          handleUpload: (e) => {
            const filterImages = props.value.filter(
              (item) => item?.id !== file?.id,
            );
            props.handleChange([
              ...filterImages,
              { ...e, id: file.id, error: e?.error },
            ]);
            setImageReload(false);
          },
        });
      } else {
        uploadFileS3(
          file,
          (e) => {
            const filterImages = props.value.filter(
              (item) => item?.id !== file?.id,
            );
            props.handleChange([
              ...filterImages,
              { ...e, id: file.id, error: e?.error },
            ]);
            setImageReload(false);
          },
          (e) => {
            setUploadProgress([
              ...uploadProgress,
              { progress: e, id: file.id },
            ]);
          },
        );
      }
    };
    useEffect(() => {
      if (props?.value?.length > 0 && !updatedOnce) {
        setImages(props?.value);
        setUpdatedOnce(true);
      }
    }, [props.value]);

    // const thumbs = props.value.map((file, index) => (
    const thumbs = images.map((file, index) => {
      let progress = uploadProgress.filter((item) => item?.id === file?.id);
      if (progress.length > 0) {
        progress = progress[0].progress;
      } else {
        progress = 0;
      }
      let uploadedImage = props.value.filter((item) => item?.id === file?.id);
      if (uploadedImage.length > 0) {
        uploadedImage = uploadedImage[0];
      } else {
        uploadedImage = {};
      }
      const isError = uploadedImage?.error;
      const CustomTag = props?.notHyperLink ? "div" : "a";
      return (
        <div className="dz-thumb" key={index}>
          <CustomTag
            href={`${uploadedImage?.Location}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`dz-thumb__file ${
              uploadedImage?.Location && "active"
            }  `}
          >
            <figure>
              {file.name && UFIcon(TR.getFileExtension(file.name))}
            </figure>
            <div className="dz-thumb__file__content">
              <span className="dz-thumb__file__content--fileName">
                {file.name}
              </span>
              <UploadProgressBar
                uploadProgress={progress}
                isError={isError}
                className="dz-thumb__file__content--progress"
              />
            </div>
          </CustomTag>

          {isError ? (
            <div
              className="dz-thumb--retry click-able"
              onClick={() => handleRetry(file)}
            >
              <figure className={`${imageReload && "active"}`}>
                {rotateIcon}
              </figure>
              <span>
                {imageReload ? "Retrying..." : "Retry"}
                {" "}
              </span>
            </div>
          ) : (
            (!props?.isDetailView && !props?.isDisabled && (
              <figure
                className="dz-thumb--delete click-able"
                onClick={() => handleDelete(file.id)}
              >
                <FiX />
              </figure>
            )) || <div />
          )}
        </div>
      );
    });
    return (
      <Dropzone
        accept={`${props.accept ? props.accept : "image/*"}`}
        type="file"
        maxSize={props.size ? props.size : 625000}
        onDropAccepted={(acceptedFiles) => {
          const randomID = fiveRandomNumbers();
          if (acceptedFiles.length > 0) {
            // if (props.value.length <= 5) {
            acceptedFiles[0].id = randomID;
            // acceptedFiles[0].name = splitData(acceptedFiles[0].name, " ", "_");

            setImages(
              props.single ? [acceptedFiles[0]] : [...images, acceptedFiles[0]],
            );

            if (props?.setFileLoading) {
              props.setFileLoading(true);
            }
            if (props.privateUpload) {
              handleFileUploader({
                ...props,
                file: acceptedFiles[0],
                progressCB: (e) => {
                  setUploadProgress([
                    ...uploadProgress,
                    { progress: e, id: randomID },
                  ]);
                },
                handleUpload: (e) => {
                  props.handleChange([
                    ...props.value,
                    {
                      ...e.value,
                      name: acceptedFiles[0]?.name,
                      id: randomID,
                      error: e?.error,
                    },
                  ]);
                },
              });
            } else {
              uploadFileS3(
                acceptedFiles[0],
                (e) => {
                  if (e?.error && e?.error instanceof String) {
                    toast.error(e?.error || "Unable to update file!");
                  } else {
                    props.handleChange([
                      ...props.value,
                      {
                        ...e,
                        name: acceptedFiles[0]?.name,
                        id: randomID,
                        error: e?.error,
                      },
                    ]);
                  }
                },
                (e) => {
                  setUploadProgress([
                    ...uploadProgress,
                    { progress: e, id: randomID },
                  ]);
                  if (props?.setFileLoading && e === 100) {
                    props.setFileLoading(false);
                  }
                },
              );
            }
            // } else {
            //   toast.error("Sorry, You can upload  five images");
            // }
          }
        }}
        onDropRejected={(err) => {
          // const errors = err[0].errors.map((error) => toast.error(error.message));
          // return errors;
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="dropZoneContainer">
            {!props?.isDetailView && (
              <div
                {...getRootProps({ className: "dropzone" })}
                style={props?.isDisabled ? { pointerEvents: "none" } : {}}
              >
                <input {...getInputProps()} />
                <div
                  className={`dropzone__content ${
                    props?.uploaderText && "justify-content-center"
                  }`}
                >
                  <figure>{addIcon}</figure>
                  <p className="mx-1">
                    {props?.uploaderText || "Upload"}
                    {" "}
                  </p>
                  <span> (Upload one after another)</span>
                </div>
              </div>
            )}
            <aside className="dropZoneContainer--thumb-container">
              {thumbs}
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }),
);

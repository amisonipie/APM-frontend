import AWS from "aws-sdk";
import { env } from "utility/config";
import { toast } from "react-toastify";
import { SC, errorHandler } from "utility/helper";

export const handleFileUploader = async ({ file, ...props }) => {
  const formData = new FormData();
  formData.append("file", file);

  SC.postAttachment({
    url: props?.url,
    data: formData,
    callbackProgressUpload: (e) => props.progressCB(e),
  }).then(
    (response) => {
      const attachment = response?.data?.data?.files || response?.data?.data?.log;
      // toast.success("File uploaded successfully!");
      props.handleUpload({
        stepIndex: props.stepIndex,
        key: props.name,
        value: attachment,
        // step: props.step || 0,
      });

      return attachment;
    },
    (error) => {
      const err = errorHandler(error);
      props.handleUpload({
        error: err.toString(),
      });
      toast.error(err);
    },
  );
};

export const uploadFileS3 = (file, callBackS3, progressCB) => {
  if (file) {
    const {
      AWS_ACCESS_KEY_ID, AWS_BUCKET, AWS_SECRET_ACCESS_KEY, AWS_URL,
    } = env;
    const s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      endpoint: AWS_URL,
      s3ForcePathStyle: true,
      signatureVersion: "v4",
      ContentDisposition: `attachment;filename=${file.name}`,
    });
    const params = {
      Bucket: AWS_BUCKET,
      Key: file.name?.split(" ").join(""),
      Body: file,
      ACL: "public-read",
    };
    return s3
      .upload(params, (err, data) => {
        if (data) callBackS3(data);
        if (err) callBackS3({ error: err.toString() });
      })
      .on("httpUploadProgress", (progress) => {
        const progressPercentage = Math.round(
          (progress.loaded / progress.total) * 100,
        );
        progressCB(progressPercentage);
      });
  }
};

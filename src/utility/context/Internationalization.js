import React from "react";
import { IntlProvider } from "react-intl";
import messages_sa from "assets/data/locales/sa.json";
import messages_en from "assets/data/locales/en.json";

const menu_messages = {
  sa: messages_sa,
  en: messages_en,
};

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  state = {
    locale: "en",
    messages: menu_messages.en,
    direction: "ltr",
  };

  handleSwitch = (language, direction) => {
    this.setState({
      locale: language,
      messages: menu_messages[language],
      direction,
    });
  };

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: this.handleSwitch,
        }}
      >
        <IntlProvider
          key={locale}
          locale="en"
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    );
  }
}

export { IntlProviderWrapper, Context as IntlContext };

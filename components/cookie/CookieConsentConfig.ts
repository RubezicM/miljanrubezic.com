import type { CookieConsentConfig } from "vanilla-cookieconsent";

const pluginConfig: CookieConsentConfig = {
  root: "body",
  autoShow: true,
  hideFromBots: true,
  cookie: {},
  guiOptions: {
    consentModal: {
      layout: "box wide",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "bar",
      position: "right",
      equalWeightButtons: true,
    },
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {
      enabled: true,
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
          {
            name: "_gid",
          },
        ],
      },
    },
  },
  onModalReady: ({ modalName }) => {
    console.log("ready:", modalName);
  },

  onModalShow: ({ modalName }) => {
    console.log("visible:", modalName);
  },
  language: {
    default: "en",
    translations: {
      en: {
        consentModal: {
          title: "We use cookies",
          description:
            "We use cookies to enhance your experience and analyze our traffic. By clicking 'Accept all', you consent to our use of cookies.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Customize",
        },
        preferencesModal: {
          title: "Manage cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Accept current selection",
          closeIconLabel: "Close modal",
          sections: [
            {
              title: "Somebody said ... cookies?",
              description:
                "We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.\n" +
                "\n </br></br>" +
                'The cookies that are categorized as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site.\n' +
                "\n </br></br>" +
                "We also use third-party cookies that help us analyze how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent.\n" +
                "</br></br>" +
                "You can choose to enable or disable some or all of these cookies but disabling some of them may affect your browsing experience.",
            },
            {
              title: "Strictly Necessary cookies",
              description:
                "These cookies are essential for the proper functioning of the website and cannot be disabled.",

              linkedCategory: "necessary",
            },
            {
              title: "Performance and Analytics",
              description:
                "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
              linkedCategory: "analytics",
            },
          ],
        },
      },
    },
  },
};
export const getCookieConsentConfig = () => {
  return pluginConfig;
};

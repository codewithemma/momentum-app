export const routes = {
  auth: {
    login: "/login",
  },
  leads: {
    main: "/",
    new: "/leads/new",
    leadById: (id: string) => `/leads/${id}`,
  },
  dashboard: {
    home: "/",
  },
  faqs: "/faqs",
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy",
};

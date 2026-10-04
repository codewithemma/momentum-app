export const routes = {
  auth: {
    login: "/login",
  },
  leads: {
    main: "/leads",
    new: "/leads/new",
    leadById: (id: string) => `/leads/${id}`,
  },
  dashboard: {
    home: "/dashboard",
  },
  faqs: "/faqs",
  terms: "/terms-and-conditions",
  privacy: "/privacy-policy",
};

export const ROUTES = {
  auth: {
    signup: {
      name: "signup",
      href: "/auth/signup",
    },
    login: {
      name: "login",
      href: "/auth/login",
    },
  },
  home: {
    name: "home",
    href: "/",
  },
  links: {
    name: "links",
    href: "api/links",
    analytics: {
      name: "linkAnalytics",
      href: "api/links/analytics",
    }
  },
  users: {
    name: "users",
    href: "api/users",
    me: {
      name: "usersMe",
      href: "api/users/me",
    },
    
  },
  cloudinary: {
    signature: {
      name: "cloudinarySignature",
      href: "api/cloudinary/signature"
    }
  },
  preview: {
    name: "preview",
    href: "/preview"
  },
  share: {
    name: "share",
    href: "/share"
  }
};


export default function verifyRequest(req, res, next) {

    if (process.env.NODE_ENV === "development") {
    
        res.locals.shop = "offercounter.myshopify.com";
        return next();
      }
    
    const session = res.locals.shopify?.session;
  
    if (!session?.shop) {
      return res.status(401).send("Unauthorized");
    }
  
    res.locals.shop = session.shop;
    next();
  }
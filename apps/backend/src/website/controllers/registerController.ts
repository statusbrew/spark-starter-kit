export const registerController = async (req, res) => {
    try {
      console.log("I am working Perfectly Fine");
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        status_code: 400,
        success: false,
        message: "something went wong",
      });
    }
  };
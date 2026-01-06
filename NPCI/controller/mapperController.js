import mapperModel from "../models/mapperModel.js";

const checkMapping = async (req, res) => {
  const { aadhar } = req.body;
  if (aadhar.trim().length !== 12) {
    return res.status(400).json({ message: "Invalid Aadhar number" });
  }
  // Logic to check mapping based on aadhar
  try {
    console.log("Checking mapping for Aadhar:", aadhar);
    const mapping = await mapperModel.findOne({ aadharNumber: String(aadhar) });
    // console.log("Mapping found:", mapping);
    // if (!mapping) {
    //   return res
    //     .status(404)
    //     .json({ message: "No mapping found for the provided Aadhar number." });
    // }
    if (mapping && mapping.seedingStatus) {
      res.json({
        aadharNumber: aadhar,
        accountNumber: mapping.accountNumber,
        bankName: mapping.bankName,
        seedingStatus: mapping.seedingStatus,
        success: true,
        lastUpdated: mapping.lastUpdated,
      });
    } else if (mapping && !mapping.seedingStatus) {
      res
        .status(200)
        .json({ seedingStatus: mapping.seedingStatus, success: true });
    } else {
      res.status(404).json({
        message: "No mapping found for the provided Aadhar number.",
        seedingStatus: false,
      });
    }
    res.send("ok");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export { checkMapping };

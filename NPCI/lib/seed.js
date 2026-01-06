import connectdb from "./db.js";
import Mapper from "../models/mapperModel.js";
import { config } from "dotenv";
config();

console.log("MONGO_URI from seed.js:", process.env.MONGO_URI);

await connectdb();

const dummyMapperData = [
  {
    aadharNumber: "659812347890",
    iin: "508534",
    accountNumber: "451782003459",
    bankName: "State Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "782456901234",
    iin: "607161",
    accountNumber: "322198765450",
    bankName: "HDFC Bank",
    bankStatus: "Active",
    seedingStatus: false,
  },
  {
    aadharNumber: "901234568721",
    iin: "504993",
    accountNumber: "110045672890",
    bankName: "ICICI Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "568912347650",
    iin: "608001",
    accountNumber: "996732145678",
    bankName: "Bank of Baroda",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "734509182367",
    iin: "620055",
    accountNumber: "557801234599",
    bankName: "Punjab National Bank",
    bankStatus: "Dormant",
    seedingStatus: false,
  },

  {
    aadharNumber: "612398745210",
    iin: "508703",
    accountNumber: "783210459876",
    bankName: "Union Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "709845612378",
    iin: "608028",
    accountNumber: "667823190245",
    bankName: "Canara Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "845612379801",
    iin: "507957",
    accountNumber: "891234560987",
    bankName: "Axis Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "934567812045",
    iin: "607389",
    accountNumber: "556789013245",
    bankName: "Kotak Mahindra Bank",
    bankStatus: "Active",
    seedingStatus: false,
  },

  {
    aadharNumber: "765489123067",
    iin: "508534",
    accountNumber: "459876123780",
    bankName: "State Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "812349567004",
    iin: "607161",
    accountNumber: "992345671234",
    bankName: "HDFC Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "954612780034",
    iin: "504993",
    accountNumber: "340987651234",
    bankName: "ICICI Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "634509812789",
    iin: "608001",
    accountNumber: "442109876345",
    bankName: "Bank of Baroda",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "720918345600",
    iin: "620055",
    accountNumber: "778899001122",
    bankName: "Punjab National Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },

  {
    aadharNumber: "569821430987",
    iin: "508703",
    accountNumber: "886745239001",
    bankName: "Union Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "692310458712",
    iin: "608028",
    accountNumber: "451239007812",
    bankName: "Canara Bank",
    bankStatus: "Active",
    seedingStatus: false,
  },
  {
    aadharNumber: "885123467901",
    iin: "507957",
    accountNumber: "782134569800",
    bankName: "Axis Bank",
    bankStatus: "Dormant",
    seedingStatus: false,
  },
  {
    aadharNumber: "934782156003",
    iin: "607389",
    accountNumber: "343256781234",
    bankName: "Kotak Mahindra Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },

  {
    aadharNumber: "567812903456",
    iin: "508534",
    accountNumber: "998823451200",
    bankName: "State Bank of India",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "789023564781",
    iin: "607161",
    accountNumber: "691234572980",
    bankName: "HDFC Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "980045612390",
    iin: "504993",
    accountNumber: "120340985671",
    bankName: "ICICI Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "640298751230",
    iin: "608001",
    accountNumber: "781234908765",
    bankName: "Bank of Baroda",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "705981243678",
    iin: "620055",
    accountNumber: "342569780011",
    bankName: "Punjab National Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },

  {
    aadharNumber: "615278903451",
    iin: "508703",
    accountNumber: "665544112200",
    bankName: "Union Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "702349815620",
    iin: "608028",
    accountNumber: "110022334455",
    bankName: "Canara Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "890123467880",
    iin: "507957",
    accountNumber: "772345119800",
    bankName: "Axis Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "953402178600",
    iin: "607389",
    accountNumber: "556677889900",
    bankName: "Kotak Mahindra Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },

  {
    aadharNumber: "678912304567",
    iin: "508534",
    accountNumber: "325689104578",
    bankName: "State Bank of India",
    bankStatus: "Dormant",
    seedingStatus: false,
  },
  {
    aadharNumber: "812234567980",
    iin: "607161",
    accountNumber: "456712908345",
    bankName: "HDFC Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "945610239087",
    iin: "504993",
    accountNumber: "340987105678",
    bankName: "ICICI Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "638910472345",
    iin: "608001",
    accountNumber: "780120349876",
    bankName: "Bank of Baroda",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "720345981267",
    iin: "620055",
    accountNumber: "552300119900",
    bankName: "Punjab National Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },

  {
    aadharNumber: "569830127654",
    iin: "508703",
    accountNumber: "789011223344",
    bankName: "Union Bank of India",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "693210847569",
    iin: "608028",
    accountNumber: "992211003355",
    bankName: "Canara Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "886122340987",
    iin: "507957",
    accountNumber: "880033559911",
    bankName: "Axis Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "934789120056",
    iin: "607389",
    accountNumber: "772200559988",
    bankName: "Kotak Mahindra Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },

  {
    aadharNumber: "567984230167",
    iin: "508534",
    accountNumber: "881234907761",
    bankName: "State Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "789564301278",
    iin: "607161",
    accountNumber: "667899001234",
    bankName: "HDFC Bank",
    bankStatus: "Active",
    seedingStatus: false,
  },
  {
    aadharNumber: "980056712309",
    iin: "504993",
    accountNumber: "449900228877",
    bankName: "ICICI Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "640987532410",
    iin: "608001",
    accountNumber: "223311559900",
    bankName: "Bank of Baroda",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "705892341765",
    iin: "620055",
    accountNumber: "891133227700",
    bankName: "Punjab National Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },

  {
    aadharNumber: "615309742581",
    iin: "508703",
    accountNumber: "551122009988",
    bankName: "Union Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "702398516240",
    iin: "608028",
    accountNumber: "339900775511",
    bankName: "Canara Bank",
    bankStatus: "Active",
    seedingStatus: false,
  },
  {
    aadharNumber: "890234178901",
    iin: "507957",
    accountNumber: "772211559900",
    bankName: "Axis Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "953410287610",
    iin: "607389",
    accountNumber: "113355779900",
    bankName: "Kotak Mahindra Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },

  {
    aadharNumber: "678934016457",
    iin: "508534",
    accountNumber: "445522116600",
    bankName: "State Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "812398675900",
    iin: "607161",
    accountNumber: "662299004411",
    bankName: "HDFC Bank",
    bankStatus: "Dormant",
    seedingStatus: false,
  },
  {
    aadharNumber: "945623780987",
    iin: "504993",
    accountNumber: "772211004455",
    bankName: "ICICI Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "638954012345",
    iin: "608001",
    accountNumber: "559900113355",
    bankName: "Bank of Baroda",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "720398456267",
    iin: "620055",
    accountNumber: "118899224466",
    bankName: "Punjab National Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },

  {
    aadharNumber: "569843210987",
    iin: "508703",
    accountNumber: "550022334477",
    bankName: "Union Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "693245871269",
    iin: "608028",
    accountNumber: "228877991100",
    bankName: "Canara Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "886145670987",
    iin: "507957",
    accountNumber: "667700114455",
    bankName: "Axis Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "934800156003",
    iin: "607389",
    accountNumber: "778822001199",
    bankName: "Kotak Mahindra Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },

  {
    aadharNumber: "567890123467",
    iin: "508534",
    accountNumber: "223311778899",
    bankName: "State Bank of India",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "789112233456",
    iin: "607161",
    accountNumber: "998877221100",
    bankName: "HDFC Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "980078965432",
    iin: "504993",
    accountNumber: "110099887744",
    bankName: "ICICI Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "640767890123",
    iin: "608001",
    accountNumber: "441122779900",
    bankName: "Bank of Baroda",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "705889001234",
    iin: "620055",
    accountNumber: "772288449901",
    bankName: "Punjab National Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },

  {
    aadharNumber: "615322110998",
    iin: "508703",
    accountNumber: "556600112299",
    bankName: "Union Bank of India",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "702311449230",
    iin: "608028",
    accountNumber: "112200334455",
    bankName: "Canara Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
  {
    aadharNumber: "890211567801",
    iin: "507957",
    accountNumber: "778800334411",
    bankName: "Axis Bank",
    bankStatus: "Inactive",
    seedingStatus: false,
  },
  {
    aadharNumber: "953455229100",
    iin: "607389",
    accountNumber: "440099776655",
    bankName: "Kotak Mahindra Bank",
    bankStatus: "Active",
    seedingStatus: true,
  },
];

const dummy2 = [
  {
    aadharNumber: "820720746792",
    iin: "508534",
    accountNumber: "451782003459",
    bankName: "State Bank of India",
    bankStatus: "Active",
    seedingStatus: true,
    registeredEmail: "sahil.22311046@viit.ac.in",
    registeredPhone: "9322803356",
  },
];

const addMapper = async () => {
  try {
    const inserted = await Mapper.insertMany(dummy2);
    console.log(
      `✅ ${inserted.length} mapped data entries added successfully.`
    );
  } catch (error) {
    console.log("❌ Error adding mapped data:", error);
  }
};

// Delete all data
const deleteMapper = async () => {
  try {
    await Mapper.deleteMany({});
    console.log("✅ All mapped data deleted successfully.");
  } catch (error) {
    console.error("❌ Error deleting mapped data:", error);
  }
};

// Example runner
const run = async () => {
  await addMapper();
  // await deleteMapper();
  process.exit(0); // Exit process once done
};

run();

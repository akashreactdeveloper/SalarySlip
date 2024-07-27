const express = require("express");
const multer = require("multer");
const path = require("path");
const csv = require('csvtojson');
const { User } = require('./models/User');
const cors = require('cors');
const fsExtra = require('fs-extra');

const app = express();

app.use(cors());

// Static folder for serving the HTML form
app.use(express.static(path.join(__dirname, 'public')));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file uploads
app.post('/uploaddata', upload.single('file'), async (req, res) => {
    try {
        const user = [];

        const response = await csv().fromFile(req.file.path);

        for (let i of response) {
            user.push({
                name: i['Name of Employee'],
                uan : i['UAN No.'],
                gender : i['Gender'],
                esic : i['ESIC NO.'],
                fatherName: i["Father's Name"],
                grossPay: i['Gross Salary/Daily wages'],
                basicPay: i['Basic'],
                homeAll: i['HRA'],
                dearAllo: i['CA'],
                medicalAll: i['MA'],
                actualworkingDays: i['Actual Working Days'],
                cl: i['CL'],
                sl: i['SL'],
                el: i['EL'],
                holidaysunday: i['Holiday/Sunday'],
                bonus: i['Bonus'],
                totalDays: i['TOTAL days'],
                basicdue: i['Basic Due'],
                homeAll1: i['HRA(A)'],
                dearAllo1: i['CA(A)'],
                medicalAll1: i['MA(A)'],
                salaryPayable: i['Salary Payable'],
                epfowages: i['EPFO WAGES'],
                esicwages: i['ESIC WAGES'],
                pf: i['P.F 3.67%'],
                epf: i['E.P.F 8.33%'],
                pf1: i['P.F 12%'],
                esic: i['ESIC 0.75%'],
                lw: i['L/W'],
                totaldeduction: i['Total Deduction'],
                netsalarypayable: i['Net Salary Payable'],
                clpending: i['CL Pending'],
                clavailed: i['CL Availed'],
                clbalance: i['CL Balance'],
                slpending: i['SL Pending'],
                slavailed: i['SL Availed'],
                slbalance: i['SL Balance'],
                elpreviousbalance: i['EL PREVIOUS BALANCE'],
                elcreditthismonth: i['EL CREDIT THIS MONTH'],
                totalelavailedtillthismonth: i['TOTAL EL AVAILED TILL THIS MONTH'],
                elbalance: i['EL BALANCE']
            });
        }

        await User.insertMany(user);
        const folder = './public/uploads'

        fsExtra.emptyDirSync(folder);

        return res.send({
            success: true,
            message: 'Data Uploaded'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error parsing CSV file or inserting data'
        });
    }
});

app.get('/getdata', async (req, res) => {
    try {
        const data = await User.find({});

        return res.send({
            success: true,
            data: data
        })
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'error fetching data'
        })
    }
});

app.get('/getuserdata/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const data = await User.findOne({ _id: id });

        return res.send({
            success: true,
            data: data
        })
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'error fetching data'
        })
    }
});

app.delete('/cleardata', async (req, res) => {
    try {
        await User.deleteMany({});
        return res.json({ success: true, message: 'All data cleared successfully' });
    } catch (error) {
        console.error('Error clearing data:', error);
        return res.json({ success: false, message: 'Failed to clear data' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/salary-slip-project", {
    serverSelectionTimeoutMS: 5000, // Example: Set timeout to 5 seconds
    socketTimeoutMS: 45000, // Example: Set socket timeout to 45 seconds
})
    .then(() => console.log('Connected With Database Successfully'))
    .catch((err) => console.error('Error Connecting with Database', err));


const userSchema = new mongoose.Schema({
    // name: i['Name of Employee'],
    name: String,
    uan: String,
    gender: String,
    esic: String,
    fatherName: String,
    grossPay: String,
    basicPay: String,
    homeAll: String,
    dearAllo: String,
    medicalAll: String,
    actualworkingDays: String,
    cl: String,
    sl: String,
    el: String,
    holidaysunday: String,
    totalDays: String,
    basicdue: String,
    homeAll1: String,
    dearAllo1: String,
    medicalAll1: String,
    salaryPayable: String,
    epfowages: String,
    esicwages: String,
    pf: String,
    epf: String,
    pf1: String,
    esic: String,
    lw: String,
    totaldeduction: String,
    netsalarypayable: String,
    clpending: String,
    clavailed: String,
    clbalance: String,
    slpending: String,
    slavailed: String,
    slbalance: String,
    elpreviousbalance: String,
    elcreditthismonth: String,
    totalelavailedtillthismonth: String,
    elbalance: String,
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
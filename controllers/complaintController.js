let complaints = [];

exports.getComplaints = (req, res) => {
    res.json(complaints);
};

exports.createComplaint = (req, res) => {
    const { name, complaint } = req.body;

    const newData = {
        id: complaints.length + 1,
        name,
        complaint,
        status: "pending"
    };

    complaints.push(newData);

    res.json({
        message: "Keluhan berhasil ditambahkan",
        data: newData
    });
};

exports.updateStatus = (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const complaint = complaints.find(c => c.id === id);

    if (!complaint) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    complaint.status = status;

    res.json({
        message: "Status berhasil diupdate",
        data: complaint
    });
};
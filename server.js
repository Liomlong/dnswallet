const express = require('express');
const app = express();

app.use(express.json()); // 用于解析 JSON 请求体

// 创建 POST 路由处理交易发送
app.post('/api/send-transaction', (req, res) => {
    const { domain, price } = req.body;

    // 这里添加你的逻辑来处理交易
    // 模拟发送成功
    console.log(`Received request to purchase ${domain} for ${price} nanotokens.`);

    // 响应请求
    res.status(200).json({ message: `Transaction for ${domain} processed successfully.` });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

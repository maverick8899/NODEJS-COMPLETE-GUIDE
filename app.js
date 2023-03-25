const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  // mặc định Header là Content-Type: text/plain và status code: 200 OK.
  //trình duyệt sẽ giải mã mã HTML nếu nó được trả về từ máy chủ web. not recommended
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  //khi một yêu cầu HTTP POST được gửi đến đường dẫn "/message",
  // chương trình sẽ ghi một thông điệp "DUMMY" vào tập tin "message.txt"
  //và chuyển hướng trình duyệt về trang chủ.
  if (url === "/message" && method === "POST") {
    //Streams-Buffer
    const body = [];

    //khi Streams nhận dữ liệu từ submit
    req.on("data", (chunk) => {
      //chunk là từng partial của data theo cơ chế Streams-Buffer
      console.log(chunk);
      body.push(chunk);
    });

    // return-callback này được gọi, phần code xử lý yêu cầu tiếp theo sẽ không được thực thi
    // cho đến khi việc ghi dữ liệu vào file đã hoàn thành.
    //return sẽ kết thúc xử lý của yêu cầu và không có yêu cầu mới nào có thể được gửi đến trong quá trình xử lý.
    return req.on("end", () => {
      // khi một Stream đã không còn dữ liệu để đọc
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];

      //hàm Asynchronously
      fs.writeFile("message.txt", message, (err) => {
        err && console.log(err);
        //redirect
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  //nếu trình duyệt yêu cầu URL khác với "/", "/message"
  //đặt setHeader ở đây để tranh lặp setHeader với /message
  //setHeader cần phải được đặt ở trên các lệnh res.write() hoặc res.end()
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);

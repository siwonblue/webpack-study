const fetchData = async () => {
  // index.html 이 로드되면 백엔드 서버로 직접 요청을 보냄.
  try {
    const result = await fetch("http://localhost:3065/api/test", {
      message: "proxy server test",
    });
    const data = result.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

const testData = async () => {
  try {
    const result = await fetch("/api");
    const data = result.text();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// fetchData().then((r) => null);

testData().then((r) => null);

document.querySelector(".container").innerHTML = "JS aa is connected ";

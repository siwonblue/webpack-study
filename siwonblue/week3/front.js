const testData = async () => {
  try {
    // 프록시 설정 하지 않으면 url 을 "http://localhost:3065/api" 라고 적음.
    // 프록시 설정을 하게 되면 url 을 아래처럼 적음 ( devServer config 에 맞춰서 적는다는 의미)
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

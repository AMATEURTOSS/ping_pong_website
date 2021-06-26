import { useEffect } from "react";

const MainPage = (): JSX.Element => {

  useEffect(() => {
    let searchParams = new URLSearchParams(window.location.search);
    const fetchOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({code: searchParams.get('code')})
    }
    fetch('http://localhost:3001/api/oauth', fetchOption)
    .then(res => res.json())
    .then(res => console.log(res));
  }, []);

  return (
    <h1>main</h1>
  );
}

export default MainPage;
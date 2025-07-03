async function fetchData() {
  try {
    const res = await fetch("http://localhost:4000/v1/api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "admin@gmail.com",
        password: "12345678"
      }),
      method: "POST"
    });

    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

fetchData();

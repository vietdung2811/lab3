export const fetchModel = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET", // Phương thức GET để lấy dữ liệu
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json(); // Phân tích dữ liệu JSON trả về
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

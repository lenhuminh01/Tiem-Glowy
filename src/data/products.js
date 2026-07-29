const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vT5bwwUn9WBcDA28UyM6f9inDgu-9s18XzT_x5vCIIKVi_mM6teMt4D_GRUL0b0CcEC5IiYqCtYKFw6/pub?output=csv";


function parseCSV(text) {
  const rows = text.split("\n");

  const headers = rows[0]
    .split(",")
    .map(header => header.trim());

  return rows.slice(1)
    .filter(row => row.trim())
    .map(row => {
      const values = row.split(",");

      const product = {};

      headers.forEach((header, index) => {
        product[header] = values[index]?.trim() || "";
      });

      return {
        id: product.id,
        name: product.name,
        title: product.name,

        shopName: product.shopName,
        shop: product.shopName,

        image: product.image,
        affiliateUrl: product.affiliateUrl,

        isLyniePick:
          product.isLyniePick === "TRUE",

        lyniePick:
          product.isLyniePick === "TRUE",

        category: product.category,
        description: product.description
      };
    });
}


export async function getProducts() {
  const response = await fetch(SHEET_URL);

  const csv = await response.text();

  return parseCSV(csv);
}

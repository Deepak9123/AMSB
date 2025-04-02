// Testing Application And Services

const testFunction = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Backend Services</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f4;
              }
              .container {
                text-align: center;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>🚀 Services is Running!</h1>
            </div>
          </body>
          </html>
        `)
  } catch (error) {
    res.status(500).send({ staus: 500, message: error.message })
  }
}

module.exports = { testFunction }

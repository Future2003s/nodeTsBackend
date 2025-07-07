"use strict";
import { TypeRequestBodyMail } from "~/services/mail.service";

// thông báo khách nhận hàng trong hôm nay
const templateAlertOrderNow = (data: TypeRequestBodyMail) => {
  return `<!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Thông báo giao hàng - Đơn hàng của bạn đang đến!</title>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet">
        <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #fdf6f6;
            font-family: 'Quicksand', Arial, sans-serif;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #dddddd;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .content {
            padding: 30px;
            color: #333333;
            line-height: 1.7;
        }
        .signature {
            padding: 20px;
            background-color: #fff8f8;
            color: #333333;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background-color: #d9534f;
            color: #ffffff;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin-top: 15px;
        }
    </style>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #fdf6f6; font-family: 'Quicksand', Arial, sans-serif;">
    <!-- TIÊU ĐỀ EMAIL ĐỀ XUẤT: 🚚 Giao hàng ngay hôm nay! Đơn hàng #[Mã đơn hàng] của bạn đang đến. -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:rgb(115, 81, 81);">
        <tr>
            <td align="center" style="padding: 20px 10px;">
                <table class="container" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dddddd; box-shadow: 0 4px 15px rgba(0,0,0,0.05);" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 30px 0; text-align: center; background-color: #ffffff;">
                            <img src="https://d3enplyig2yenj.cloudfront.net/logo" alt="Logo LALA-LYCHEEE" style="max-width: 200px; height: auto;">
                        </td>
                    </tr>
                    <!-- NỘI DUNG CHÍNH VỚI WATERMARK -->
                    <tr>
                        <td align="center" class="content" style="background-position: center; background-repeat: no-repeat; background-size: 250px; padding: 10px 40px 30px 40px;">
                            <!--[if gte mso 9]>
                            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:400px;">
                                <v:fill type="tile" src="https://i.imgur.com/a1689b.jpg" color="#ffffff" />
                                <v:textbox inset="0,0,0,0">
                            <![endif]-->
                            <div>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="background-color: rgba(255, 255, 255, 0.9); padding: 25px; border-radius: 8px; text-align: center;">
                                            <!-- BẮT ĐẦU NỘI DUNG VĂN BẢN -->
                                            <h2 style="color: #d9534f; margin-top: 0;">🚚🚚🚚 Đơn hàng đang trên đường đến!</h2>
                                            <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.7;">
                                                Kính gửi <strong>${data.customerInfo.name}</strong>,
                                            </p>
                                            <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px;">
                                                <strong> Đơn hàng của bạn sẽ được giao đến bạn trong ngày hôm nay.</strong>.
                                            </p>
                                            <p style="margin: 0 0 25px 0; color: #333333; font-size: 16px;">
                                                Bạn vui lòng chuẩn bị và để ý điện thoại để nhận hàng từ shipper nhé!
                                            </p>
                                            <!-- KẾT THÚC NỘI DUNG VĂN BẢN -->
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if gte mso 9]>
                                </v:textbox>
                            </v:rect>
                            <![endif]-->
                        </td>
                    </tr>
                    <!-- Chữ ký Công ty -->
                    <tr>
                        <td class="signature" style="padding: 30px 40px; background-color: #fff8f8; color: #333333; font-size: 14px; border-top: 1px solid #fceeee; text-align: center;">
                            <p style="margin: 0;">Cảm ơn bạn đã mua sắm tại LALA-LYCHEEE!</p>
                        </td>
                    </tr>
                </table>

                <table width="100%" style="max-width: 600px;" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 0; font-size: 12px; color: #aaaaaa;">
                            <p style="margin: 0;">🐝🐝🐝</p>
                            <p style="margin: 10px 0 0 0;">Bạn nhận được email này vì đã đặt hàng tại LALA-LYCHEEE.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

// cảm ơn đã đặt hàng thành công khi đã giao xong
const templateThankYou = (data: TypeRequestBodyMail) => {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Cảm ơn bạn đã mua Mật Ong Hoa Vải!</title>
    <style>
        /* CSS reset for better rendering */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }

        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: auto !important;
            }
        }

        /* Button hover effect */
        .cta-button:hover {
            background: #c52a78 !important;
            box-shadow: 0 8px 15px rgba(0,0,0,0.2) !important;
            transform: translateY(-2px) !important;
        }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: #f1f1f1;">
    <!-- Centered container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f1f1;">
        <tr>
            <td align="center" valign="top">
                <!-- Main email content table -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; margin: 20px auto; border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.08);">
                    
                    <!-- Header with Logo, Bees, and Gradient -->
                    <tr>
                        <td align="center" style="padding: 30px 0; background: linear-gradient(to bottom, #fde4f2, #ffffff); border-radius: 12px 12px 0 0;">
                            <div style="font-size: 22px; margin-bottom: 10px;">
                                🐝 &nbsp; 🌸 &nbsp; 🐝
                            </div>
                            <img src="https://d3enplyig2yenj.cloudfront.net/logo" alt="Logo LALA-LYCHEEE" width="160" style="display: block; border-radius: 999px;">
                            <div style="font-size: 22px; margin-top: 10px;">
                                &nbsp; &nbsp; &nbsp; 🌸 &nbsp; &nbsp; &nbsp; 🐝
                            </div>
                        </td>
                    </tr>
                    <!-- Main Content Section -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333; text-align: center;">
                            <h1 style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #d63384;">🌸 Cảm ơn bạn đã chọn Mật Ong Hoa Vải! 🐝</h1>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">Xin chào [Tên khách hàng],</p>
                            <p style="font-size: 16px; line-height: 1.6; margin: 0;">Cảm ơn bạn đã tin tưởng và lựa chọn sản phẩm Mật Ong Hoa Vải thơm ngon từ LALA-LYCHEEE. Chúng tôi hy vọng bạn sẽ yêu thích vị ngọt thanh tự nhiên này.</p>
                        </td>
                    </tr>

                    <!-- Order Details Section -->
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                                        <!-- Order Items Table -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #555555;">
                                            <thead>
                                                <tr>
                                                    <th align="left" style="padding-bottom: 10px; border-bottom: 1px solid #e0e0e0;">Sản phẩm</th>
                                                    <th align="right" style="padding-bottom: 10px; border-bottom: 1px solid #e0e0e0;">Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <!-- Product Item -->
                                                <tr>
                                                    <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">${data.order.products[0].name}</td>
                                                    <td align="right" style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">280.000đ</td>
                                                </tr>
                                                <!-- Totals -->
                                                <tr>
                                                    <td style="padding: 15px 0 0 0; font-weight: bold; font-size: 16px;">Tổng cộng</td>
                                                    <td align="right" style="padding: 15px 0 0 0; font-weight: bold; color: #d63384; font-size: 16px;">${data.order.totalValue}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Call to Action Button -->
                    <tr>
                        <td align="center" style="padding: 0 40px 40px 40px;">
                            <a href="#" target="_blank" class="cta-button" style="display: inline-block; padding: 15px 35px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; color: #ffffff; background: #d63384; background: linear-gradient(to right, #e73b91, #d63384); border-radius: 50px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;">
                                Xem chi tiết đơn hàng
                            </a>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #f8f9fa; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #888888; border-radius: 0 0 12px 12px;">
                            <p style="margin: 0 0 10px 0;">Bạn nhận được email này vì đã đăng ký tại LALA-LYCHEEE.</p>
                            <p style="margin: 0;">© 2024 LALA-LYCHEEE. Đã đăng ký Bản quyền.</p>
                            <p style="margin: 10px 0 0 0;">
                                <a href="#" target="_blank" style="color: #d63384; text-decoration: none;">Trang chủ</a> |
                                <a href="#" target="_blank" style="color: #d63384; text-decoration: none;">Chính sách</a> |
                                <a href="#" target="_blank" style="color: #d63384; text-decoration: none;">Hủy đăng ký</a>
                            </p>
                        </td>
                    </tr>

                </table>
                <!-- /Main email content table -->
            </td>
        </tr>
    </table>
    <!-- /Centered container -->
</body>
</html>
`;
};

//xác nhận đơn hàng
const confirmOrderCustomer = (data: TypeRequestBodyMail) => {
  //tạo danh sách sản phẩm
  const productRowsHtml = data.order.products
    .map((product) => {
      const itemTotal = product.price * product.quantity;
      const formatedTotal = new Intl.NumberFormat("vi-VN").format(itemTotal);

      return `
      <tr class="product-item">
        <td>
          <table border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td><img src="https://placehold.co/130x130/fafafa/c59a9a?text=Sản+phẩm" alt="Hình ảnh sản phẩm" class="product-image"></td>
              <td>
                <span class="product-name">${product.name}</span><br>
                <span class="product-qty">Số lượng: ${product.quantity}</span>
              </td>
            </tr>
          </table>
        </td>
        <td align="right" class="product-name">${formatedTotal}đ</td>
      </tr>
    `;
    })
    .join("");

  const formattedGrandTotal = new Intl.NumberFormat("vi-VN").format(data.order.totalValue);

  return `<!DOCTYPE html>
    <html lang="vi">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác Nhận Đơn Hàng - LALA-LYCHEEE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <style>
        /* CSS Reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

        /* Luxe/Boutique Inspired Styles */
        body {
            background-color: #f7f7f7;
            font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .container {
            width: 100%;
            max-width: 620px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 4px;
            overflow: hidden;
        }
        .header {
            padding: 30px;
            text-align: center;
            background-color: #fafafa;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 40px 40px;
        }
        .content h1 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            color: #2b2b2b;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 15px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.7;
            color: #555555;
            text-align: center;
            margin-bottom: 30px;
        }
        .order-summary-table {
            width: 100%;
            margin: 30px 0;
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
        }
        .order-summary-table td {
            padding: 18px 0;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        .order-summary-table tr:last-child td {
            border-bottom: 0;
        }
        .product-image {
            width: 65px;
            height: 65px;
            object-fit: cover;
            border-radius: 4px;
            margin-right: 20px;
        }
        .product-name {
            color: #2b2b2b;
            font-weight: 700;
            font-size: 16px;
        }
        .product-qty {
            color: #555555;
        }
        .totals-table {
            width: 100%;
            margin-top: 20px;
        }
        .totals-table td {
            padding: 8px 0;
            color: #555555;
            font-size: 16px;
        }
        .totals-table .total-row td {
            font-weight: 700;
            font-size: 18px;
            color: #2b2b2b;
            padding-top: 15px;
        }
        .address-info {
            padding: 20px 0;
            margin-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
        .address-info h3 {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            color: #2b2b2b;
            margin-top: 0;
            margin-bottom: 12px;
            font-weight: 700;
        }
        .address-info p {
            font-size: 15px;
            line-height: 1.7;
            margin: 0;
            color: #555555;
            text-align: left;
        }
        .footer {
            text-align: center;
            padding: 30px;
            font-size: 13px;
            color: #888888;
            background-color: #fafafa;
        }
        .footer a {
            color: #c59a9a; /* Dusty Rose */
            text-decoration: none;
            font-weight: 700;
        }
        .button {
            display: inline-block;
            background-color: #c59a9a; /* Dusty Rose */
            color: #ffffff !important;
            padding: 14px 35px;
            text-decoration: none;
            border-radius: 50px; 
            font-weight: 700;
            margin: 30px 0 10px;
            font-size: 14px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        /* Responsive */
        @media screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: #f7f7f7; padding: 20px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="620">
                <tr>
                <td align="center" valign="top" width="620">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" class="container">
                    <!-- HEADER -->
                    <tr>
                        <td class="header">
                            <img src="https://d3enplyig2yenj.cloudfront.net/logo" alt="LALA-LYCHEEE Logo">
                        </td>
                    </tr>
                    <!-- CONTENT -->
                    <tr>
                        <td class="content">
                            <h1>Cảm ơn quý khách</h1>
                            <p>Đơn hàng của bạn đã được xác nhận. LALA-LYCHEEE đang chuẩn bị sản phẩm và sẽ sớm giao đến cho bạn.</p>
                            
                            <!-- ITEMS TABLE -->
                            <table class="order-summary-table" border="0" cellpadding="0" cellspacing="0">
                                <!-- Bắt đầu một sản phẩm -->
                                ${productRowsHtml}
                                <!-- Kết thúc một sản phẩm -->
                            </table>

                            <!-- ORDER TOTALS -->
                            <table class="totals-table" border="0" cellpadding="0" cellspacing="0">
                                <tr class="total-row">
                                    <td><strong>Tổng cộng</strong></td>
                                    <td align="right"><strong>${formattedGrandTotal}</strong></td>
                                </tr>
                            </table>

                            <!-- ADDRESS INFO -->
                            <div class="address-info">
                                <h3>Giao đến</h3>
                                <p>
                                    <strong>${data.shippingInfo?.recipientName}</strong><br>
                                    ${data.shippingInfo?.address}<br>
                                    ${data.shippingInfo?.phone}
                                </p>
                            </div>
                        </td>
                    </tr>
                    <!-- FOOTER -->
                    <tr>
                        <td class="footer">
                            <p>Cần hỗ trợ? <a href="mailto:[Email Hỗ Trợ]">Liên hệ với chúng tôi</a>.</p>
                            <p style="margin-top: 15px;">
                                <strong>LALA-LYCHEEE</strong><br>
                                Thôn Tú Y, xã Hà Đông, thành phố Hải Phòng
                            </p>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
    </table>
</body>
${console.log(3)}
</html>
`;
};

export { templateAlertOrderNow, templateThankYou, confirmOrderCustomer };

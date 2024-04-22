import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customerAddBooking } from "../../store/booking/bookingSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getAlls, selectAllDesks } from "../../store/desk/deskSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const CustomerHome = () => {
  const dispatch = useDispatch();
  const desks = useSelector(selectAllDesks);
  const [newCustomerBooking, setNewCustomerBooking] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDesk, setSelectedDesk] = useState("");

  const handleInputChange = useCallback((e) => {
    setNewCustomerBooking((prevCustomerBooking) => ({
      ...prevCustomerBooking,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleQuantityChange = (event) => {
    const value = event.target.value;

    // Kiểm tra xem giá trị có phải là số không
    if (!isNaN(value) && parseInt(value) >= 0) {
      setNewCustomerBooking({
        ...newCustomerBooking,
        quantityPerson: parseInt(value),
      });
    }
  };

  //Xử lý format ngày tháng năm của bookingTime
  const formatBookingTime = (dateTimeString) => {
    // Tạo một đối tượng Date từ chuỗi thời gian
    const dateTime = new Date(dateTimeString);

    // Lấy các thành phần của thời gian: ngày, tháng, năm, giờ, phút
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Thêm số 0 phía trước nếu cần
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");

    // Tạo chuỗi định dạng mới, ví dụ: "YYYY-MM-DD HH:MM"
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDateTime;
  };

  //Xử lý khi khách hàng bấm "Đặt bàn"
  const handleCustomerAddBooking = (event) => {
    event.preventDefault();
    dispatch(customerAddBooking(newCustomerBooking));
    console.log("data newCustomerBooking: ", newCustomerBooking);
    alert("Quý khách đã điền thông tin đặt bàn!");
    setNewCustomerBooking({
      customerName: "",
      email: "",
      phone: "",
      address: "",
      bookingTime: "",
      quantityPerson: 0,
    });
    setSelectedDesk("");
    dispatch(getAlls());
  };

  const handleDeskChange = (e) => {
    const selectedDeskId = e.target.value;
    setSelectedDesk(selectedDeskId);
    setNewCustomerBooking((prev) => ({
      ...prev,
      deskId: selectedDeskId,
    }));
  };

  useEffect(() => {
    dispatch(getAlls());
  }, [dispatch]);

  useEffect(() => {
    const emptyDesks = desks.filter((desk) => desk.status === "EMPTY");

    // Kiểm tra nếu không còn bàn trống
    if (emptyDesks.length === 0 && desks.length > 0) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [desks]);

  return (
    <>
      <section
        id="topbar"
        className="d-flex align-items-center fixed-top topbar-transparent"
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-center justify-content-lg-start">
          <i className="bi bi-phone d-flex align-items-center">
            <span>+84 24 3333 1701</span>
          </i>
          <i className="bi bi-clock ms-4 d-none d-lg-flex align-items-center">
            <span>T2-T7: 6h00 - 22h00</span>
          </i>
        </div>
      </section>

      <header
        id="header"
        className="fixed-top d-flex align-items-center header-transparent"
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <div className="logo me-auto">
            <h1>
              <Link to="/home">Grill63</Link>
            </h1>
            <Link to="/home">
              <img src="assets/img/logo.png" alt="" className="img-fluid" />
            </Link>
          </div>

          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Trang chủ
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#gallery">
                  Ảnh
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <a href="#book-a-table" className="book-a-table-btn scrollto">
            Đặt bàn
          </a>
        </div>
      </header>

      <section id="hero">
        <div className="hero-container">
          <div
            id="heroCarousel"
            data-bs-interval="5000"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <ol
              className="carousel-indicators"
              id="hero-carousel-indicators"
            ></ol>

            <div className="carousel-inner" role="listbox">
              {/* Slide 1 */}
              <div
                className="carousel-item active"
                style={{
                  backgroundImage: `url(assets/img/slide/slide-1.jpg)`,
                }}
              >
                <div className="carousel-container">
                  <div className="carousel-content">
                    <h2 className="animate__animated animate__fadeInDown">
                      <span>Grill</span> 63
                    </h2>
                    <p className="animate__animated animate__fadeInUp">
                      Nhà hàng Grill63 của Khách sạn LOTTE Hà Nội phục vụ bò bít
                      tết hảo hạng và danh mục rượu vang thượng hạng ngay tại
                      trung tâm thành phố. Với phong cách bài trí hiện đại,
                      Grill63 là nơi lý tưởng cho những dịp đặc biệt hoặc bữa
                      tối lãng mạn với tầm nhìn toàn cảnh Hà Nội trên tầng 63.
                      Hãy đến để tận hưởng trải nghiệm ẩm thực tinh tuý ở nơi
                      đây.
                    </p>
                    <div>
                      <a
                        href="#menu"
                        className="btn-menu animate__animated animate__fadeInUp scrollto"
                      >
                        Menu
                      </a>
                      <a
                        href="#book-a-table"
                        className="btn-book animate__animated animate__fadeInUp scrollto"
                      >
                        Đặt bàn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Slide 2 */}
              <div
                className="carousel-item"
                style={{
                  backgroundImage: `url(assets/img/slide/slide-2.jpg)`,
                }}
              >
                <div className="carousel-container">
                  <div className="carousel-content">
                    <h2 className="animate__animated animate__fadeInDown">
                      <span>Grill</span> 63
                    </h2>
                    <p className="animate__animated animate__fadeInUp">
                      Nhà hàng Grill63 của Khách sạn LOTTE Hà Nội phục vụ bò bít
                      tết hảo hạng và danh mục rượu vang thượng hạng ngay tại
                      trung tâm thành phố. Với phong cách bài trí hiện đại,
                      Grill63 là nơi lý tưởng cho những dịp đặc biệt hoặc bữa
                      tối lãng mạn với tầm nhìn toàn cảnh Hà Nội trên tầng 63.
                      Hãy đến để tận hưởng trải nghiệm ẩm thực tinh tuý ở nơi
                      đây.
                    </p>
                    <div>
                      <a
                        href="#menu"
                        className="btn-menu animate__animated animate__fadeInUp scrollto"
                      >
                        Menu
                      </a>
                      <a
                        href="#book-a-table"
                        className="btn-book animate__animated animate__fadeInUp scrollto"
                      >
                        Đặt bàn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div
                className="carousel-item"
                style={{
                  backgroundImage: `url(assets/img/slide/slide-3.jpg)`,
                }}
              ></div>
              <a
                className="carousel-control-prev"
                href="#heroCarousel"
                role="button"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bi bi-chevron-left"
                  aria-hidden="true"
                ></span>
              </a>

              <a
                className="carousel-control-next"
                href="#heroCarousel"
                role="button"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bi bi-chevron-right"
                  aria-hidden="true"
                ></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="about" className="about">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-lg-5 align-items-stretch video-box"
                style={{
                  backgroundImage: `url(assets/img/about.jpg)`,
                }}
                onClick={() =>
                  (window.location.href =
                    "https://www.tiktok.com/@mrsky.official/video/7124289467942440218")
                }
              >
                <a
                  href="https://www.tiktok.com/@mrsky.official/video/7124289467942440218"
                  className="venobox play-btn mb-4"
                  data-vbtype="video"
                  data-autoplay="true"
                ></a>
              </div>

              <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch">
                <div className="content">
                  <h3>
                    Trải nghiệm ẩm thực độc đáo trong không gian sang trọng,
                    hiện đại tại
                    <strong> Grill 63</strong>
                  </h3>
                  <p>
                    Nhà hàng Grill 63 nổi bật với vị trí đắc địa, nằm ngay trong
                    khuôn viên của tòa nhà cao ốc Lotte Center, tọa lạc giữa khu
                    trung tâm Hà Nội. Cũng chính vì thế, du khách không những
                    được thưởng thức những món ăn tại đây mà còn được chiêm view
                    nhìn toàn cảnh tuyệt vời. Bên cạnh đó, không gian sang trọng
                    bên trong cũng là một trong những yếu tố đặc trưng không thể
                    bỏ qua khi nhắc đến nhà hàng Grill 63 này.
                  </p>
                  <ul>
                    <li>
                      <i className="bx bx-check-double"></i> Thực đơn vô cùng đa
                      dạng, phong phú tại Grill 63.
                    </li>
                    <li>
                      <i className="bx bx-check-double"></i> Không gian nhà hàng
                      sang trọng, hiện đại.
                    </li>
                    <li>
                      <i className="bx bx-check-double"></i> Đội ngũ nhân viên
                      chu đáo, chuyên nghiệp.
                    </li>
                  </ul>
                  <p>
                    Để cảm nhận vẻ đẹp trọn vẹn nhất của nhà hàng Grill 63, hãy
                    đến đây vào buổi chiều tối. Khi ánh mặt trời đang dần khuất,
                    thực khách có dịp ngắm cảnh hoàng hôn view cao. Tối đến,
                    thành phố lên đèn, vẻ đẹp lung linh, mờ ảo “động lòng
                    người”. Bữa tối bên cạnh gia đình hay người thương sẽ thêm
                    phần ấm áp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="why-us">
          <div className="container">
            <div className="section-title">
              <h2>
                Tại sao lại chọn<span> nhà hàng của chúng tôi</span>
              </h2>
              <p>
                Grill63 là nơi lý tưởng cho những dịp đặc biệt hoặc bữa tối lãng
                mạn
              </p>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="box">
                  <span>01</span>
                  <h4>Những món ngon đa dạng, hấp dẫn</h4>
                  <p>
                    Ghé thăm một khu vực buffet với những món ngon được trưng
                    bày với nhiều màu sắc khác nhau
                  </p>
                </div>
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box">
                  <span>02</span>
                  <h4>Vẻ đẹp hiện đại, sang trọng</h4>
                  <p>
                    Những vật dụng nội thất từ bé đến lớn đều được trang bị tỉ
                    mỉ, phù hợp với không gian chung
                  </p>
                </div>
              </div>

              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box">
                  <span>03</span>
                  <h4>Đầu bếp chuyên nghiệp, tỉ mỉ</h4>
                  <p>
                    Với trình độ chuyên môn và niềm đam mê với nghề, họ luôn
                    biết cách làm hài lòng thực khách của mình qua những hương
                    vị được “gửi gắm” trong từng món ăn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="book-a-table" className="book-a-table">
          <div className="container">
            <div className="section-title">
              <h2>
                Đặt <span>Bàn</span>
              </h2>
              <p>Khách hàng có thể đặt trước bàn tại đây.</p>
            </div>

            {/* Form đặt bàn */}
            <form
              action="forms/book-a-table.php"
              method="post"
              role="form"
              className="php-email-form"
              onSubmit={handleCustomerAddBooking}
            >
              <div className="row">
                <div className="col-lg-4 col-md-6 form-group">
                  <input
                    type="text"
                    name="customerName"
                    className="form-control"
                    id="name"
                    placeholder="Tên khách hàng"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                    value={newCustomerBooking.customerName}
                    onChange={handleInputChange}
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                    value={newCustomerBooking.email}
                    onChange={handleInputChange}
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    placeholder="Số điện thoại"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                    value={newCustomerBooking.phone}
                    onChange={handleInputChange}
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    id="address"
                    placeholder="Địa chỉ"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                    value={newCustomerBooking.address}
                    onChange={handleInputChange}
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="bookingTime"
                    id="time"
                    placeholder="Thời gian đặt"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                    value={formatBookingTime(newCustomerBooking.bookingTime)}
                    onChange={handleInputChange}
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <input
                    type="number"
                    className="form-control"
                    name="quantityPerson"
                    id="people"
                    placeholder="Số lượng người"
                    data-rule="minlen:1"
                    data-msg="Please enter at least 1 chars"
                    value={newCustomerBooking.quantityPerson}
                    onChange={handleQuantityChange}
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3 formInput">
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="deskId">Số bàn</InputLabel>
                    <Select
                      className="input"
                      labelId="deskId"
                      id="deskId"
                      label="Tên bàn"
                      name="deskId"
                      value={selectedDesk}
                      onChange={handleDeskChange}
                    >
                      {desks &&
                        desks
                          .filter((desk) => desk.status === "EMPTY")
                          .map((desk) => (
                            <MenuItem key={desk.id} value={desk.id}>
                              {desk.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Đặt bàn</button>
              </div>
            </form>
          </div>
        </section>

        <section id="gallery" className="gallery">
          <div className="container-fluid">
            <div className="section-title">
              <h2>
                Một số ảnh từ <span>nhà hàng của chúng tôi</span>
              </h2>
              <p>
                Hãy đến để tận hưởng trải nghiệm ẩm thực tinh tuý ở nơi đây.
              </p>
            </div>

            <div className="row g-0">
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-1.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-1.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-2.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-2.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-3.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-3.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-4.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-4.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-5.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-5.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-6.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-6.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-7.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-7.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-8.jpg"
                    className="gallery-lightbox"
                  >
                    <img
                      src="assets/img/gallery/gallery-8.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials">
          <div className="container position-relative">
            <div
              className="testimonials-slider swiper"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img
                      src="assets/img/testimonials/testimonials-5.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Nguyễn Văn Anh</h3>
                    {/* <h4>Ceo &amp; Founder</h4> */}
                    Khách hàng
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Đồ ăn ngon, không gian đẹp, phục vụ tốt!
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container">
          <h3>Grill63</h3>
          <p>
            Nhà hàng Grill63 của Khách sạn LOTTE Hà Nội phục vụ bò bít tết hảo
            hạng và danh mục rượu vang thượng hạng ngay tại trung tâm thành phố.
          </p>
          <div className="social-links">
            <a href="#" className="twitter">
              <i className="bx bxl-twitter"></i>
            </a>
            <a href="#" className="facebook">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#" className="google-plus">
              <i className="bx bxl-skype"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bx bxl-linkedin"></i>
            </a>
          </div>
          <div className="copyright">
            &copy; Copyright{" "}
            <strong>
              <span>Grill63</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </footer>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hiện tại đã hết bàn. Xin vui lòng thử lại sau.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            autoFocus
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerHome;

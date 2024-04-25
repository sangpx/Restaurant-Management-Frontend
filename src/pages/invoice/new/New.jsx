import "./new.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import {
  getAllBookings,
  selectAllBookings,
} from "../../../store/booking/bookingSlice";
import {
  createInvoice,
  getAllInvoices,
  selectAllInvoices,
} from "../../../store/invoice/invoiceSlice";
import SidebarBooking from "../../../components/sidebarBooking/SidebarBooking";

const NewInvoice = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedBooking, setSelectedBooking] = useState("");
  const bookings = useSelector(selectAllBookings);
  const invoices = useSelector(selectAllInvoices);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const handleBookingChange = (e) => {
    setSelectedBooking(e.target.value);
  };

  const handleAddInvoice = (event) => {
    event.preventDefault();
    dispatch(createInvoice(selectedBooking));
    setSelectedBooking("");
    navigate("/invoices");
    dispatch(getAllInvoices());
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setSelectedBooking("");
    navigate("/invoices");
  };

  return (
    <div className="new">
      <SidebarBooking />
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAddInvoice} method="post">
              <div className="formInput">
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="bookingId">Mã đặt bàn</InputLabel>
                  <Select
                    className="input"
                    labelId="bookingId"
                    id="bookingId"
                    label="Mã đặt bàn"
                    name="bookingId"
                    value={selectedBooking}
                    onChange={handleBookingChange}
                  >
                    {bookings.map((booking) => {
                      // Kiểm tra nếu trạng thái của đặt bàn là "CONFIRMED"
                      if (booking.status === "CONFIRMED") {
                        // Kiểm tra xem có invoice nào có trạng thái "PENDING" hoặc "ORDERED_FOOD" không
                        const hasPendingInvoice = invoices.some(
                          (invoice) =>
                            invoice.bookingId === booking.id &&
                            (invoice.status === "PENDING" ||
                              invoice.status === "ORDERED_FOOD" ||
                              invoice.status === "PAID")
                        );
                        // Nếu không có invoice nào có trạng thái "PENDING" hoặc "ORDERED_FOOD" thì hiển thị mã đặt bàn
                        if (!hasPendingInvoice) {
                          return (
                            <MenuItem key={booking.id} value={booking.id}>
                              {booking.id}
                            </MenuItem>
                          );
                        }
                      }
                      return null; // Trả về null nếu không thỏa điều kiện
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="formButton">
                <button onClick={handleCancel}>Hủy</button>
                <button type="submit">Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
/*
  some(): để kiểm tra xem có ít nhất một phần tử trong mảng invoices 
  thỏa mãn điều kiện được xác định hay không.

  invoices.some() sẽ trả về true nếu ít nhất một phần tử trong mảng invoices t
  hỏa mãn điều kiện được xác định trong hàm callback.
  Hàm callback nhận vào mỗi phần tử của mảng invoices 
  và trả về một giá trị boolean (true hoặc false), 
  thể hiện liệu phần tử đó có thỏa mãn điều kiện hay không.
  Trong hàm callback, điều kiện kiểm tra như sau:

  invoice.bookingId === booking.id: So sánh bookingId của invoice 
  với id của booking hiện tại, đảm bảo rằng invoice đang được xem xét 
  là thuộc về booking hiện tại.
  (invoice.status === "PENDING" || 
  invoice.status === "ORDERED_FOOD" || 
  invoice.status === "PAID"): 
  Kiểm tra trạng thái của invoice, nếu trạng thái là "PENDING", 
  "ORDERED_FOOD" hoặc "PAID" thì điều kiện sẽ trả về true, nếu không, 
  điều kiện sẽ trả về false.
  Do đó, biến hasPendingInvoice sẽ trở thành true nếu có ít nhất 
  một invoice thuộc booking hiện tại có trạng thái là 
  "PENDING", "ORDERED_FOOD" hoặc "PAID".
*/

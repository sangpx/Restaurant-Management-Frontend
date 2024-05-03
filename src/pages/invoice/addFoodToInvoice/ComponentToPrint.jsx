import moment from "moment";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInvoices,
  selectAllInvoices,
} from "../../../store/invoice/invoiceSlice";
import { useParams } from "react-router-dom";

const ComponentToPrint = forwardRef(({ invoiceDetails }, ref) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const invoices = useSelector(selectAllInvoices);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [deskId, setDeskId] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  useEffect(() => {
    const idNumber = parseInt(id);
    const invoiceExisted = invoices.find((invoice) => invoice.id === idNumber);
    if (invoiceExisted) {
      const checkInTimeFormatted = moment(invoiceExisted.checkInTime).format(
        "DD/MM/YYYY [:] HH:mm"
      );
      const checkOutTimeFormatted = moment(invoiceExisted.checkOutTime).format(
        "DD/MM/YYYY [:] HH:mm"
      );
      setCheckInTime(checkInTimeFormatted);
      setCheckOutTime(checkOutTimeFormatted);
      setDeskId(invoiceExisted.deskId);
      setStatus(invoiceExisted.status);
    }
  }, [id, invoices]);

  const formatIntoMoney = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const calculateTotalAmount = () => {
    let sum = 0;
    invoiceDetails.forEach((row) => {
      sum += row.intoMoney;
    });
    return sum;
  };
  return (
    <div ref={ref}>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          HÓA ĐƠN THANH TOÁN
        </h2>
        <div style={{ marginBottom: "20px" }}>
          <div>
            <strong>Số hóa đơn:</strong> {id}
          </div>
          <div>
            <strong>Giờ vào:</strong> {checkInTime}
          </div>
          <div>
            <strong>Giờ ra:</strong> {checkOutTime}
          </div>
          <div>
            <strong>Bàn ăn:</strong> {deskId}
          </div>
          <div>
            <strong>Trạng thái:</strong>{" "}
            {status === "PAID" ? "Đã thanh toán" : status}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Tên món ăn</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Giá</th>
              <th style={{ textAlign: "center", padding: "8px" }}>Số lượng</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {invoiceDetails.map((item, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{item.nameFood}</td>
                <td style={{ padding: "8px" }}>{item.price}</td>
                <td style={{ padding: "8px", textAlign: "center" }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "8px" }}>
                  {formatIntoMoney(item.intoMoney)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <strong>Tổng tiền:</strong> {formatIntoMoney(calculateTotalAmount())}
        </div>
      </div>
      <h4 style={{ textAlign: "center", marginTop: "20px" }}>
        Nhà hàng Grill63 - 54 Liễu Giai - Ba Đình - Hà Nội
      </h4>
      <h5 style={{ textAlign: "center", marginTop: "20px" }}>
        +84 24 3333 1701
      </h5>

      <h4 style={{ textAlign: "center", marginTop: "20px" }}>
        Trân trọng cảm ơn quý khách! Hẹn gặp lại
      </h4>
    </div>
  );
});

export default ComponentToPrint;

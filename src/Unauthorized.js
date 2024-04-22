import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>401 Unauthorized</h1>
      <br />
      <p>Bạn không có quyền truy cập vào trang này</p>
      <div className="flexGrow">
        <Button onClick={goBack} variant="contained">
          Trở về
        </Button>
      </div>
    </section>
  );
};

export default Unauthorized;

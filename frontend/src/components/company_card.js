import React, { useState } from "react";

import { monts } from "@/styles/fonts";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import pstyle from "@/styles/page.module.css";
import { DoServiceRequest } from "@/logic/service_interactions";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  border: 0,
  boxShadow: 24,
  p: 4,
};

const CompanyCard = (props) => {
  let data = props.data;

  const [m, setm] = useState(false);

  const handleModalOpen = () => setm(true);
  const hClose = () => setm(false);

  return (
    <>
      <Modal
        open={m}
        onClose={hClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={pstyle.modalHead}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data.service_name}
            </Typography>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Link href={`/company/${data.company_name}`}>
                By {data.company_name}
              </Link>
            </Typography>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, overflow: "scroll" }}
          >
            {data.service_desc}
          </Typography>
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Field Of Work: {data.service_fow}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Created on: {data.service_creation_date}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              {data.service_reqnum} Customer Requests so far
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              Price: ${data.service_price}/hr
            </Typography>
          </div>
          <Button
            variant="outlined"
            color="info"
            sx={{ width: 180 }}
            onClick={() => DoServiceRequest(data.company_id, data.id)}
          >
            Request Service
          </Button>
        </Box>
      </Modal>
      <div className={`${pstyle.companyCard}`} onClick={handleModalOpen}>
        <div className={pstyle.mainCardInfo}>
          <div className={`${monts.className}`}>{data.service_name}</div>
          <div className={`${monts.className} ${pstyle.bgreen}`}>
            Price: ${data.service_price}/hr
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;

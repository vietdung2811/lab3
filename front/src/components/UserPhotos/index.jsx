import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchModel } from "../../lib/fetchModelData";

function UserPhotos() {
  const { userId } = useParams(); // Lấy ID người dùng từ URL
  const [photos, setPhotos] = useState([]); // State để lưu danh sách ảnh

  // Hàm để lấy danh sách ảnh từ API
  useEffect(() => {
    const getPhotos = async () => {
      try {
        // Lấy dữ liệu ảnh từ API
        const data = await fetchModel(
          `https://ccxwwr-8081.csb.app/api/photo/photosOfUser/${userId}` // Đường dẫn API mới
        );
        console.log("Fetched photos data:", data); // Kiểm tra dữ liệu nhận được trong console
        setPhotos(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching photos:", error); // Xử lý lỗi nếu có
      }
    };

    if (userId) {
      getPhotos(); // Gọi API khi có userId
    }
  }, [userId]); // Dependency array để gọi lại khi userId thay đổi

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Photos of User {userId}
      </Typography>

      {photos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No photos available
        </Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} sx={{ mb: 4, borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={`https://ccxwwr-8081.csb.app/api/photo/image/${photo.file_name}`} // Sửa đường dẫn lấy ảnh theo file_name
              alt={`Photo`} // Mô tả ảnh
              sx={{
                maxHeight: 500,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
              }}
            />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Chip label={photo.date_time} size="small" sx={{ mr: 1 }} />{" "}
                {/* Hiển thị thời gian chụp */}
                <Typography variant="caption" color="text.secondary">
                  {photo.comments.length} comments {/* Số lượng bình luận */}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              {photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <Box key={comment._id} sx={{ mb: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                      <strong>
                        {comment.user.first_name} {comment.user.last_name}:
                      </strong>{" "}
                      {/* Hiển thị tên người dùng */}
                      <br />
                      {comment.comment} {/* Hiển thị bình luận */}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {new Date(comment.date_time).toLocaleString()}{" "}
                      {/* Hiển thị thời gian bình luận */}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No comments yet
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default UserPhotos;

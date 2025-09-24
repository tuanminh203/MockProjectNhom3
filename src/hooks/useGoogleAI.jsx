// src/hooks/useGoogleAI.js
import { useState, useCallback } from 'react';
import axios from 'axios';

// Đây là một placeholder cho API Key của bạn
// TUYỆT ĐỐI KHÔNG ĐỂ API KEY TRONG CLIENT-SIDE CODE TRONG MÔI TRƯỜNG THẬT!
// Hãy chuyển việc gọi API AI sang backend của bạn.
const GOOGLE_AI_STUDIO_API_KEY = "AIzaSyDhHyTql4Wa9yb2YV_e4XBsEpcOfjlNKLk"; // THAY THẾ BẰNG KEY CỦA BẠN

const useGoogleAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAIAnalysis = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    let analysisResult = "Không thể kết nối đến AI để phân tích.";

    try {
      // Trong môi trường thật, bạn nên gửi yêu cầu này đến backend của mình
      // và backend sẽ gọi Google AI Studio để bảo mật API Key.
      // Dưới đây là ví dụ gọi trực tiếp (chỉ dùng cho mục đích phát triển local)
      const prompt = `
        Dựa trên dữ liệu sau đây của nhà hàng:
        - Tổng số đặt bàn: ${data.reservations}
        - Tổng số order món: ${data.orders}
        - Tổng doanh thu: ${data.revenue} VNĐ
        - Các món ăn bán chạy nhất: ${data.dishes.map(d => `${d.name} (${d.quantity} lượt)`).join(', ')}.

        Hãy phân tích tình hình kinh doanh, đưa ra nhận định về hiệu suất hoạt động,
        và đề xuất 3-5 hướng đi hoặc chiến lược bán hàng để cải thiện doanh thu và tối ưu hóa hoạt động.
        Phản hồi bằng tiếng Việt và chỉ tập trung vào phân tích và đề xuất.
      `;

      // Đây là một ví dụ gọi API Gemini (thông qua Google AI Studio)
      // Bạn cần cấu hình endpoint và headers chính xác dựa trên tài liệu của Google.
      const response = await axios.post(
        `http://googleusercontent.com/aiplatform.googleapis.com/v1beta1/projects/YOUR_PROJECT_ID/locations/global/publishers/google/models/gemini-pro:streamGenerateContent?key=${GOOGLE_AI_STUDIO_API_KEY}`, // Thay YOUR_PROJECT_ID
        {
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        }
      );

      // Xử lý phản hồi từ Gemini API
      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        analysisResult = response.data.candidates[0].content.parts[0].text;
      } else {
        analysisResult = "AI không đưa ra được phân tích rõ ràng.";
      }

    } catch (err) {
      console.error("Lỗi khi gọi Google AI Studio:", err);
      setError("Có lỗi khi phân tích dữ liệu từ AI.");
      analysisResult = "Không thể phân tích dữ liệu. Vui lòng kiểm tra kết nối hoặc API Key.";
    } finally {
      setIsLoading(false);
    }
    return analysisResult;
  }, []);

  return { fetchAIAnalysis, isLoading, error };
};

export default useGoogleAI;
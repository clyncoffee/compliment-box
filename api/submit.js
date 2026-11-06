export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 본인의 실제 구글 Apps Script 웹 앱 URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyglVK_XmyOMIH95OCnfnzJblbjMcdFq0UavE6TLj-15YeDEYPOt3V42zKChPM_93sUDg/exec";

  try {
    // 1. req.body가 문자열로 들어오든 객체로 들어오든 안정적으로 JSON 직렬화
    let bodyPayload = req.body;
    if (typeof bodyPayload === 'string') {
      try {
        bodyPayload = JSON.parse(bodyPayload);
      } catch (e) {
        // 이미 파싱 불가능한 문자열이면 그대로 사용
      }
    }

    // 2. Apps Script 웹 앱으로 전송
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    const resultText = await response.text();
    return res.status(200).json({ success: true, result: resultText });
  } catch (error) {
    console.error("전송 에러:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

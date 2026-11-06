export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 본인의 실제 구글 Apps Script 웹 앱 URL (https://script.google.com/macros/s/.../exec)
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyglVK_XmyOMIH95OCnfnzJblbjMcdFq0UavE6TLj-15YeDEYPOt3V42zKChPM_93sUDg/exec";

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const resultText = await response.text();
    return res.status(200).json({ success: true, result: resultText });
  } catch (error) {
    console.error("Apps Script 호출 에러:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

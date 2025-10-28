"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export type FormData = {
  name: string
  email: string
  organization: string
  role: string
  interests: string
  message: string
  language: string
}

export async function sendJoinEmail(data: FormData) {
  try {
    const { name, email, organization, role, interests, message, language } = data

    // Create email content
    const subject = language === "ar" ? `طلب انضمام جديد من ${name}` : `New Ecosystem Join Request from ${name}`

    const htmlContent = `
      <h1>${language === "ar" ? "طلب انضمام جديد إلى منظومة BAWES" : "New BAWES Ecosystem Join Request"}</h1>
      <p><strong>${language === "ar" ? "الاسم" : "Name"}:</strong> ${name}</p>
      <p><strong>${language === "ar" ? "البريد الإلكتروني" : "Email"}:</strong> ${email}</p>
      <p><strong>${language === "ar" ? "المؤسسة" : "Organization"}:</strong> ${organization || "Not provided"}</p>
      <p><strong>${language === "ar" ? "الدور" : "Role"}:</strong> ${role || "Not provided"}</p>
      <p><strong>${language === "ar" ? "الاهتمامات" : "Interests"}:</strong> ${interests || "Not provided"}</p>
      <p><strong>${language === "ar" ? "الرسالة" : "Message"}:</strong></p>
      <p>${message || "Not provided"}</p>
      <hr />
      <p>${language === "ar" ? "تم إرسال هذا الطلب من موقع BAWES Universe." : "This request was sent from the BAWES Universe website."}</p>
    `

    const textContent = `
${language === "ar" ? "طلب انضمام جديد إلى منظومة BAWES" : "New BAWES Ecosystem Join Request"}

${language === "ar" ? "الاسم" : "Name"}: ${name}
${language === "ar" ? "البريد الإلكتروني" : "Email"}: ${email}
${language === "ar" ? "المؤسسة" : "Organization"}: ${organization || "Not provided"}
${language === "ar" ? "الدور" : "Role"}: ${role || "Not provided"}
${language === "ar" ? "الاهتمامات" : "Interests"}: ${interests || "Not provided"}
${language === "ar" ? "الرسالة" : "Message"}:
${message || "Not provided"}

${language === "ar" ? "تم إرسال هذا الطلب من موقع BAWES Universe." : "This request was sent from the BAWES Universe website."}
    `

    // Send email with updated sender address
    const result = await resend.emails.send({
      from: "BAWES Universe <universe@testmailer.bawes.net>",
      to: ["contact@bawes.net"],
      cc: ["khalid@bawes.net"],
      reply_to: email,
      subject,
      html: htmlContent,
      text: textContent,
    })

    if (result.error) {
      console.error("Error sending email:", result.error)
      return { success: false, error: result.error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in sendJoinEmail:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

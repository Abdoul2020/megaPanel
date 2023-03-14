import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  faqsList: any[];
};

const initialState: initialState = {
  faqsList: [
    {
      question: "Megaverse nedir?",
      answer:
        "Megaverse Uluslararası Kişisel Gelişim Portalı, BülentGardiyanoğlu'nun bireysel olarak geliştirdiği, 10 yıllık emeği barındıran bir çalışma yöntemidir. Danışan ve danışmanları bir araya getiren dünyanın ilk ve tek kişisel gelişim portalıdır.",
    },
    {
      question:
        "Megaverse Uluslararası Kişisel Gelişim Portalı Projesinin amacı nedir?",
      answer:
        "Geçmiş olduğumuz pandemi ve kapanma dönemiyle beraber birçok etkinlik ve toplantı dijital tabanlı olmaya başladı; iyileşmenin yeri ya da zamanı olmaz, iyileşmek bir karardır. Megaverse Uluslararası Kişisel Gelişim Portalı ise her zaman ve her yerdeiyileşmeyi, sağlığı amaçlamaktadır.",
    },
    {
      question: "Megaverse'e nasıl katılabilirsiniz?",
      answer:
        "Sizlerin ihtiyaçlarına uygun olarak hazırladığımız 5 farklı model ile katılabilirsiniz. Daha detaylı bilgi için tıklayınız.",
    },
    {
      question: "İhtiyaç halinde nasıl teknik destek alırım?",
      answer:
        "Teknik destek ekibimiz Megaverse'ü kullandığınız süre boyunca sınırız ve ücretsiz destek ile yanınızdadır. destek@megaverse.com adresine e-posta göndererek, uygulamanın içinden (sağ üst köşedeki kullanıcı menüsü altında yer al “Destek Al” bölümünden) canlı mesajlaşma ile veya hafta içi 09.30 - 17.00 saatleri arası 0850 390 7262 no’lu telefonlardan bize ulaşabilirsiniz.",
    },
  ],
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {},
});

export default titlesSlice.reducer;
export const {} = titlesSlice.actions;

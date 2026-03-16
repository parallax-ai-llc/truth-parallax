// Religion display names and ordering — safe for client and server use
export const RELIGION_GROUPS: Record<string, { label: string; order: number }> = {
  // Abrahamic
  christianity: { label: "Christianity", order: 1 },
  judaism: { label: "Judaism", order: 2 },
  islam: { label: "Islam", order: 3 },
  gnosticism: { label: "Gnosticism", order: 4 },
  mandaeism: { label: "Mandaeism", order: 5 },
  samaritanism: { label: "Samaritanism", order: 6 },
  druze: { label: "Druze", order: 7 },
  bahai: { label: "Bahá'í", order: 8 },
  mormonism: { label: "Latter-day Saints", order: 9 },
  "christianity-lds": { label: "Latter-day Saints", order: 9 },
  catharism: { label: "Catharism", order: 10 },
  manichaeism: { label: "Manichaeism", order: 11 },
  unificationism: { label: "Unification Church", order: 12 },
  rastafari: { label: "Rastafari", order: 13 },

  // Dharmic
  hinduism: { label: "Hinduism", order: 20 },
  buddhism: { label: "Buddhism", order: 21 },
  jainism: { label: "Jainism", order: 22 },
  sikhism: { label: "Sikhism", order: 23 },

  // East Asian
  confucianism: { label: "Confucianism", order: 30 },
  taoism: { label: "Taoism", order: 31 },
  "chinese-philosophy": { label: "Chinese Philosophy", order: 32 },
  shinto: { label: "Shinto", order: 33 },

  // Iranian
  zoroastrianism: { label: "Zoroastrianism", order: 40 },
  yazidi: { label: "Yazidi", order: 41 },

  // Tibetan / Central Asian
  bon: { label: "Bon", order: 45 },
  tibetan: { label: "Tibetan", order: 46 },

  // Korean / Japanese new religions
  "korean-shamanism": { label: "Korean Shamanism", order: 50 },
  tenrikyo: { label: "Tenrikyo", order: 51 },
  "cao-dai": { label: "Cao Dai", order: 52 },

  // Western esoteric
  hermeticism: { label: "Hermeticism", order: 55 },
  theosophy: { label: "Theosophy", order: 56 },
  wicca: { label: "Wicca", order: 57 },
  scientology: { label: "Scientology", order: 58 },

  // Ancient Near East
  "ancient-mesopotamian": { label: "Ancient Mesopotamian", order: 60 },
  "ancient-sumerian": { label: "Ancient Sumerian", order: 61 },
  "ancient-egyptian": { label: "Ancient Egyptian", order: 62 },
  "ancient-ugaritic": { label: "Ancient Ugaritic", order: 63 },
  "ancient-hittite": { label: "Ancient Hittite", order: 64 },

  // Classical
  "ancient-greek": { label: "Ancient Greek", order: 70 },
  "ancient-greco-roman": { label: "Greco-Roman", order: 71 },

  // European mythology
  norse: { label: "Norse", order: 75 },
  celtic: { label: "Celtic", order: 76 },
  slavic: { label: "Slavic", order: 77 },
  finnish: { label: "Finnish", order: 78 },

  // Americas
  "native-american": { label: "Native American", order: 80 },
  maya: { label: "Maya", order: 81 },
  aztec: { label: "Aztec", order: 82 },
  inca: { label: "Inca", order: 83 },

  // Oceania / Africa
  polynesian: { label: "Polynesian", order: 85 },
  "aboriginal-australian": { label: "Aboriginal Australian", order: 86 },
  yoruba: { label: "Yoruba", order: 87 },
  "african-traditional": { label: "African Traditional", order: 88 },
};

// Religion display names and ordering — safe for client and server use
export const RELIGION_GROUPS: Record<string, { label: string; order: number }> = {
  christianity: { label: "Christianity", order: 1 },
  judaism: { label: "Judaism", order: 2 },
  islam: { label: "Islam", order: 3 },
  buddhism: { label: "Buddhism", order: 4 },
  hinduism: { label: "Hinduism", order: 5 },
  taoism: { label: "Taoism", order: 6 },
  sikhism: { label: "Sikhism", order: 7 },
  zoroastrianism: { label: "Zoroastrianism", order: 8 },
};

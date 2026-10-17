export const bandColors: Record<string, string> = {
  "nil": "#e00016",
  "THE JUNEJULYAUGUST": "#5d7b70",
  "DISCO VOLANTE": "#3977a3",
  "Tetsu Takano": "#39a354",
  "Tetsu Takano Trio": "#7c39a3",
};

export function getBandColor(band: string): string {
  return bandColors[band] ?? "#777777";
}
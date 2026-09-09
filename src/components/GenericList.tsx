import React from "react";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

export function GenericList<T>({
  items,
  renderItem,
  emptyMessage = "Inga poster att visa.",
}: GenericListProps<T>) {
  if (items.length === 0) {
    return <p style={{ color: "#666" }}>{emptyMessage}</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ marginBottom: "1rem" }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

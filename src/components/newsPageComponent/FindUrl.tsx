import React from "react";

export function urlify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <article key={index}>
          <a target="_blank" href={part} className="text-blue-500">
            {part}
          </a>
        </article>
      );
    }
    return part;
  });
}

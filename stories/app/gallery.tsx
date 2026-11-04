import React from "react";

import { stories } from "../utils/load-stories";
import { StoryErrorBoundary } from "./story-error-boundary";

// Browsable gallery: a sidebar grouped by `meta.title`, and the selected story
// (by id in the URL hash, as `#<story-id>`).

const getHashId = () => decodeURIComponent(window.location.hash.slice(1));

const useHashId = () =>
  React.useSyncExternalStore((onChange) => {
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, getHashId);

const groupByTitle = (list: typeof stories) => {
  const groups = new Map<string, typeof stories>();
  for (const story of list) {
    groups.set(story.title, [...(groups.get(story.title) ?? []), story]);
  }
  return [...groups];
};

export const Gallery = () => {
  const id = useHashId();
  const [filter, setFilter] = React.useState("");
  const story = stories.find((s) => s.id === id) ?? stories[0];

  const query = filter.trim().toLowerCase();
  const groups = groupByTitle(
    query
      ? stories.filter((s) =>
          `${s.title} ${s.name}`.toLowerCase().includes(query),
        )
      : stories,
  );

  return (
    <div className="gallery">
      <nav className="sidebar">
        <input
          type="search"
          placeholder="Filter stories"
          aria-label="Filter stories"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        {groups.map(([title, items]) => (
          <section key={title}>
            <h2>{title}</h2>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={item.id === story.id ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <main className="story">
        <h1>
          {story.title} / {story.name}
        </h1>
        <p className="file">{story.file}</p>
        {/* Remount per story, so state doesn't carry over between them. */}
        <div key={story.id} data-story-id={story.id}>
          <StoryErrorBoundary>
            <story.Component />
          </StoryErrorBoundary>
        </div>
      </main>
    </div>
  );
};

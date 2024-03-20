export interface RemarkDocument {
  data: {
    id: number;
    title: string;
    category: string;
    subHeadings?: string[];
    type?: string;
    description?: string;
    image?: string;
    slug: string;
    scope?: string;
    sidebarTree?: any[]
  };
  messages: [];
  history: [];
  /**
   * The raw file contents inculding frontmatter
   */
  contents: string;

  /**
   * The markdown content
   */
  content: string;
}

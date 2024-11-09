import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test('I can see a <textarea> element with corresponding id="editor"', async ({
  page,
}) => {
  const editorTextarea = page.locator("#editor");
  await expect(editorTextarea).toBeVisible();

  const tagName = await editorTextarea.evaluate((el) =>
    el.tagName.toLowerCase()
  );
  expect(tagName).toBe("textarea");
});

test('I can see an element with corresponding id="preview"', async ({
  page,
}) => {
  const previewElement = page.locator("#preview");
  await expect(previewElement).toBeVisible();
});

test("When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea", async ({
  page,
}) => {
  const editorElement = page.locator("#editor");
  const previewElement = page.locator("#preview");

  await editorElement.fill("Hello World");
  await expect(previewElement).toHaveText("Hello World");
});

test("When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type", async ({
  page,
}) => {
  const editorElement = page.locator("#editor");
  const previewElement = page.locator("#preview");

  await editorElement.fill("# Hello World");

  const transformedElement = previewElement.locator(
    "h1:has-text('Hello World')"
  );
  const tagName = await transformedElement.evaluate((el) =>
    el.tagName.toLowerCase()
  );
  expect(tagName).toBe("h1");
});

test("When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text", async ({
  page,
}) => {
  const editorElement = page.locator("#editor");
  const previewElement = page.locator("#preview");

  await editorElement.fill(`
  # Hello World
  ## Heading 2
  [links](https://www.freecodecamp.org)
  \`<div></div>\`
  \`\`\`
    // this is
    // multi-line code
  \`\`\`
  - List item
  > Block Quote
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  **bolded text**
  `);

  await expect(
    previewElement.locator("h1:has-text('Hello World')")
  ).toBeVisible();
  await expect(
    previewElement.locator("h2:has-text('Heading 2')")
  ).toBeVisible();
  await expect(previewElement.locator("a:has-text('links')")).toBeVisible();
  await expect(
    previewElement.locator("code:has-text('<div></div>')")
  ).toBeVisible();
  await expect(previewElement.locator("pre:has-text('this is')")).toBeVisible();
  await expect(
    previewElement.locator("li:has-text('List item')")
  ).toBeVisible();
  await expect(
    previewElement.locator("blockquote:has-text('Block Quote')")
  ).toBeVisible();
  await expect(
    previewElement.locator(
      "img[src='https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg']"
    )
  ).toBeVisible();
  await expect(
    previewElement.locator("strong:has-text('bolded text')")
  ).toBeVisible();
});

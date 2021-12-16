const FAQData = {
  rows: [
    {
      title: "Why did I need to create an account to use this?",
      content:
        "We store access tokens to show your bank account information. That should remain exclusive to each account. You don't want your bank account information public to everyone!",
    },
    {
      title: "How do I add a category?",
      content:
        "Go to the category tab on the hamburger menu. Click add a category and choose your icon! :)",
    },
    {
      title: "How do I move a transaction to a specific category?",
      content:
        "Click on any transaction. Hover over the icons to see which category you would like to move it do. Click!",
    },
    {
      title: "Why can't I edit default categories?",
      content:
        "Each transaction through Plaid is categorized into default categories. Changing or deleting those categories prevents future transactions from then showing up in the categories list.",
    },
  ],
};

module.exports = FAQData;

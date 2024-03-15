/* eslint-disable */
export let callCredoPop = (credoArgs: Record<string, any>): void => {
  // @ts-ignore
  const handler = window.CredoPop && window.CredoPop.setup(credoArgs);
  handler && handler.openIframe();
};

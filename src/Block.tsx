/**
 * A block that renders the configured text.
 * @param blockConfig The block configuration.
 * @param extraProps Extra props.
 */
// @ts-ignore
export const Block = ({ blockConfig, extraProps }: any) => {
  return <h1>{blockConfig.text.content}</h1>;
};

export default Block;

import { useState, KeyboardEvent, FocusEvent } from "react";
import "../styles/style.css";

interface TagInputProps {
  separator?: string;
}

const TagInputComponent: React.FC<TagInputProps> = ({ separator = ',' }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addTags = () => {
    const newTags = inputValue
      .split(separator)
      .map(tag => tag.trim())
      .filter(tag => tag);

    const duplicateTags = newTags.filter(tag => tags.includes(tag));

    if (duplicateTags.length > 0) {
      setError(`Tag already exists. Please enter a different tag.`);
    } else if (newTags.length > 0) {
      setTags([...tags, ...newTags]);
      setError("");
    }
    setInputValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTags();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.type === 'blur') {
      event.preventDefault();
      addTags();
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="tag-input-container">
        <div className="tag-input-wrapper">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              <span className="tag-text">{tag}</span>
              <button className="tag-remove" onClick={() => removeTag(index)}>
                X
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={`Type and press Enter or use '${separator}'`}
            className="tag-input"
            id="tag-input"
          />
        </div>
      </div>
      {error && <p className="tag-error">{error}</p>}
    </>
  );
};

export default TagInputComponent;

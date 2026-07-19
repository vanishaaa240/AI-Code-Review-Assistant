import "./Editor.css";
import MonacoEditor from "@monaco-editor/react";

function Editor({
  language,
  setLanguage,
  code,
  setCode,
  handleReview,
  loading,
}) {
  const languageMap = {
    "C++": "cpp",
    "C": "c",
    "Java": "java",
    "Python": "python",
    "JavaScript": "javascript",
  };

  return (
    <div className="editor-container">

      <div className="editor-header">
        <h2>Code Editor</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>C++</option>
          <option>C</option>
          <option>Java</option>
          <option>Python</option>
          <option>JavaScript</option>
        </select>
      </div>

      <MonacoEditor
        height="500px"
        language={languageMap[language]}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          tabSize: 4,
          roundedSelection: true,
          padding: {
            top: 12,
          },
        }}
      />

      <button
  className="review-btn"
  onClick={handleReview}
  disabled={loading}
>
  {loading ? (
    <>
      <span className="loader"></span>
      Reviewing...
    </>
  ) : (
    "🚀 Review Code"
  )}
</button>

    </div>
  );
}

export default Editor;
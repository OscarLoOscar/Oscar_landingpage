export default function CourseCompareList({ items, heading }) {
  return (
    <div className="course-compare-block">
      {heading && <h4 className="course-compare-block__heading">{heading}</h4>}
      <div className="course-compare-list">
        {items.map((item) => (
          <div className="course-compare" key={item.bad}>
            <p className="course-compare__bad">{item.bad}</p>
            <p className="course-compare__good">{item.good}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

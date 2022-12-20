import React from 'react';
import useL10N from '../../util/l10n/l10n';
import ResizeableColumns from '../../util/Resizable/Columns';
import './Models.scss';
import ResizableRows from '../../util/Resizable/Rows';

const Models: React.FC = () => {
  const msg = useL10N();

  return (
    <div className="ModelsContainer">
      <ResizeableColumns
        minWidths={[200, 200]}
        initialWidths={(totalWidth) => [totalWidth / 2, totalWidth / 2]}
      >
        <div className="ModelEditor">
          <ResizableRows
            minWidths={[200, 200]}
            initialWidths={(totalWidth) => [totalWidth / 2, totalWidth / 2]}
          >
            <div className="Section">
              <header className="SectionTitle">
                {msg('models/models-title')}
              </header>
            </div>
            <div className="Section">
              <header className="SectionTitle">
                {msg('models/model-properties')}
              </header>
            </div>
          </ResizableRows>
        </div>
        <div className="Section ModelPreview">
          <header className="SectionTitle">{msg('models/preview')}</header>
        </div>
      </ResizeableColumns>
    </div>
  );
};

export default Models;

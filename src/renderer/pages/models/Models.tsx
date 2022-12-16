import React from 'react';
import useL10N from '../../util/l10n/l10n';
import ResizeableColumns from '../../util/Resizeable/Columns';
import ResizeableRows from '../../util/Resizeable/Rows';
import './Models.scss';

const Models: React.FC = () => {
  const msg = useL10N();

  return (
    <div className="ModelsContainer">
      <div className="Section">
        <header className="SectionTitle">{msg('models/models-title')}</header>
      </div>
      <div className="Section">
        <header className="SectionTitle">
          {msg('models/model-properties')}
        </header>
      </div>
      <div className="Section ModelPreview">
        <header className="SectionTitle">{msg('models/preview')}</header>
      </div>
    </div>
  );
};

export default Models;

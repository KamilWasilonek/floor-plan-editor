import { observer } from "mobx-react";
import { useObservable } from "mobx-react-lite";
import React, { memo } from "react";
import { useInstance } from "react-ioc";
import { ProjectService } from "../services/project.service";
import InlineTextEdit from "./inline-text-edit";
import List from "./list";
import WindowPanel from "./window-panel";

const ProjectCreateDialog = ({
  children,
}: {
  children: (open: () => void) => JSX.Element;
}) => {
  const data = useObservable({isOpen: false, projectName: ""});
  const projectService = useInstance(ProjectService);

  return <>
    {children(() => {
      data.isOpen = true;
      data.projectName = "";
    })}
    <WindowPanel
      active={data.isOpen}
      onClickOutside={() => {
        data.isOpen = false;
      }}>
      <List borderRadius="5px">
        {
          [
            {
              key: "header",
              body: "Create Project",
              isHeader: true,
            },
            {
              key: "name",
              body: (
                <InlineTextEdit
                  placeholder="Write project name..."
                  value={data.projectName}
                  onChange={(value) => {
                    data.projectName = value;
                  }}
                />
              ),
              isField: true,
            },
            {
              key: "action",
              body: "Create",
              onClick: async () => {
                await projectService.createProject(data.projectName);
                data.isOpen = false;
              },
              isDisabled: data.projectName.length < 1,
              isClickable: true,
            },
          ]
        }
      </List>
    </WindowPanel>
  </>;
};

export default memo(observer(ProjectCreateDialog));

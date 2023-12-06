"use client"

import Typography from "../common/components/Typography"
import EmptyLinksIcon from "../common/components/icons/EmptyLinksIcon"
import { useAppSelector } from "../common/hooks/useAppSelector"
import SingleLink from "./SingleLink"
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { useAppDispatch } from "../common/hooks/useAppDispatch"
import { reorderList } from "@/lib/store/slices/linksSlice"

const LinksList = () => {
  const { list: links } = useAppSelector((state) => state.links);
  const dispatch = useAppDispatch();

  const handleDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || !links || destination.index == source.index) {
      return;
    }

    const reorderedLinks = reorder(links, source.index, destination.index);

    if (!reorderedLinks) {
      return;
    }

    dispatch(reorderList(reorderedLinks));
  };

  const reorder = (list: typeof links, startIndex: number, endIndex: number) => {
    if (!list) {
      return;
    }

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);
  
    return result;
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {( droppableProvided ) => (
          <div 
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps} className="max-h-[35vh] overflow-auto sm:max-h-[50vh]"
          >
            {droppableProvided.placeholder}
            {(links && links.length === 0) && (
              <div 
                className="flex flex-col justify-center items-center w-full bg-custom-gray-light rounded-md p-6 mb-6"
              >
                <EmptyLinksIcon />
                <Typography variant="Heading M" className="mt-10 mb-5">Let&apos;s get you started</Typography>
                <Typography className="text-center max-w-lg">
                  Use the &quot;Add new link&quot; button to get started. Once you have more than one link,you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
                </Typography>
              </div>
            )}
        
            {links && links.length > 0 && links.map((link, index) => {
              return (
                <Draggable key={link.id} index={index} draggableId={link.id}>
                  {(draggableProvided) => (
                    <div 
                      ref={draggableProvided.innerRef} 
                      {...draggableProvided.draggableProps} 
                      {...draggableProvided.dragHandleProps}
                    >
                      <SingleLink linkData={link} index={index} />
                    </div>
                  )}
                </Draggable>
              )
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default LinksList

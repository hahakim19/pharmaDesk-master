import React, { useEffect, useState } from "react";
import pfp4 from "../Assets/Images/pfp4.svg"
import { recentActivity, typeColors } from "../Utils/Data/ActivityData.jsx";
import ActivityTile from "./ActivityTile.jsx";
import NotificationTile from "./NotificationTile.jsx";
import { useSelector } from "react-redux";
import NotifictionsSkeleton from "../Skeletons/notifications_skeleton.jsx";

const SideContent = ({ userData, handleRefresh = () => { }, acivity = recentActivity, openNotification = (notification_data, type) => { }, loading = false }) => {

    const /* { isLoading, data, error, index } */notifObject = useSelector(state => state.notifications);
    const /* { isLoading, data, error, index } */confirmedNotifObject = useSelector(state => state.confirmedNotifications);

    return (
        <>
            <div className="w-full h-full min-w-[215px] bg-lightShapes flex flex-col grow space-y-5 p-2 overflow-y-auto overflow-x-auto">
                <div className="self-end flex flex-row items-center">
                    <div className="flex flex-col items-end p-4">
                        <div className="text-sm font-medium text-textPrimary">{userData.nameOwner}</div>
                        <div className="text-xs text-textSecoundary">Administrateur</div>
                    </div>
                    <img src={pfp4} className="h-8 w-8 rounded-full" />
                </div>
                <div className="flex flex-col">
                    <div className="font-medium mb-2">Activité Récente</div>
                    {acivity.map(
                        (tile, index) => {
                            const color = typeColors[tile.type];
                            return (<ActivityTile key={`activity-tile-${index}`} tile={tile} last={index === (acivity.length - 1)} color={color} />);
                        }
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="h-1/2 w-full space-y-2">
                        <div className="inline-flex mb-2 justify-between items-center ">
                            <span className="font-medium">Commandes</span>
                            {!(notifObject.isLoading || confirmedNotifObject.isLoading) && (<span className="text-sm ml-2 text-textSecoundary cursor-pointer" onClick={() => handleRefresh()}>Refresh</span>)}
                            {(notifObject.isLoading || confirmedNotifObject.isLoading) && (<span className="text-sm ml-2 text-disabled">Refresh</span>)}
                        </div>
                        {(confirmedNotifObject.isLoading || confirmedNotifObject.data.length < 1) && <NotifictionsSkeleton length={2} />}
                        {!(confirmedNotifObject.isLoading || confirmedNotifObject.data.length < 1) && confirmedNotifObject.data.map((tile, not_index) => (<NotificationTile key={`confirm-notification-tile-${not_index}`} tile={tile} index={not_index} handleClick={() => openNotification(tile, 1)} />))}
                    </div>
                    <div className="my-5" />
                    <div className="h-1/2 w-full space-y-2">
                        <div className="inline-flex mb-2">
                            <span className="font-medium">Notifications</span>
                        </div>
                        {(notifObject.isLoading || notifObject.data.length < 1) && <NotifictionsSkeleton />}
                        {!(notifObject.isLoading || notifObject.data.length < 1) && notifObject.data.map((tile, not_index) => (<NotificationTile key={`notification-tile-${not_index}`} tile={tile} index={not_index} handleClick={() => openNotification(tile, 0)} />))}
                    </div>
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}
        </>
    );
}

export default SideContent;
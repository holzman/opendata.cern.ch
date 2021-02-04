/*
 * -*- coding: utf-8 -*-
 *
 * This file is part of CERN Open Data Portal.
 * Copyright (C) 2021 CERN.
 *
 * CERN Open Data Portal is free software; you can redistribute it
 * and/or modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * CERN Open Data Portal is distributed in the hope that it will be
 * useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CERN Open Data Portal; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
 * MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

import truncate from "lodash/truncate";
import React from "react";
import { Item, Label } from "semantic-ui-react";

import { stripHtml } from "../utils";

const CODefaultListItem = ({ result: { metadata, id }, index }) => {
  const link = `/record/${id}`;
  return (
    <Item key={index} className="results-item">
      <Item.Content>
        <Item.Header href={link}>{metadata.title}</Item.Header>
        <Item.Description href={link}>
          <p>
            {truncate(stripHtml(metadata.abstract?.description), {
              length: 200,
            })}
          </p>
        </Item.Description>
        <Item.Extra className="badges-box">
          <Label
            className="badge badge-type"
            href={`/search?f=type:${metadata.type.primary}`}
          >
            {metadata.type.primary}
          </Label>
          {metadata.type.secondary &&
            metadata.type.secondary.map((subtype) => (
              <Label
                key={subtype}
                className="badge badge-subtype"
                href={`/search?f=subtype:${subtype}`}
              >
                {subtype}
              </Label>
            ))}
          {metadata.categories?.primary && (
            <Label
              className="badge badge-category"
              href={`/search?f=category:${metadata.categories.primary}`}
            >
              {metadata.categories.primary}
            </Label>
          )}
          {metadata.categories?.secondary &&
            metadata.categories.secondary.map((subcategory) => (
              <Label
                key={subcategory}
                className="badge badge-subcategory"
                href={`/search?f=subcategory:${subcategory}`}
              >
                {subcategory}
              </Label>
            ))}
          {metadata.tags &&
            metadata.tags.map((tag) => (
              <Label
                key={tag}
                className="badge badge-tag"
                href={`/search?f=tags:${tag}`}
              >
                {tag}
              </Label>
            ))}
          {metadata.experiment && (
            <Label
              className="badge badge-experiment"
              href={`/search?f=experiment:${metadata.experiment}`}
            >
              {metadata.experiment}
            </Label>
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default CODefaultListItem;
